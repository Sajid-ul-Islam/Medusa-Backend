const express = require("express")
const { GracefulShutdownServer } = require("medusa-core-utils")
const { EntityManager, Repository } = require("typeorm")

// 🛡️ TypeORM safety patch: safely handle empty criteria `{}` used by legacy Medusa v1 services
if (EntityManager && EntityManager.prototype && EntityManager.prototype.update) {
  const origUpdate = EntityManager.prototype.update
  EntityManager.prototype.update = function (target, criteria, partialEntity) {
    if (criteria && typeof criteria === "object" && Object.keys(criteria).length === 0) {
      return this.createQueryBuilder()
        .update(target)
        .set(partialEntity)
        .where("1=1")
        .execute()
    }
    return origUpdate.call(this, target, criteria, partialEntity)
  }
}

if (Repository && Repository.prototype && Repository.prototype.update) {
  const origRepoUpdate = Repository.prototype.update
  Repository.prototype.update = function (criteria, partialEntity) {
    if (criteria && typeof criteria === "object" && Object.keys(criteria).length === 0) {
      return this.manager.update(this.target, criteria, partialEntity)
    }
    return origRepoUpdate.call(this, criteria, partialEntity)
  }
}

const loaders = require("@medusajs/medusa/dist/loaders/index").default
const { getAdminPortalHTML } = require("./admin-portal")

;(async () => {
  async function start() {
    const app = express()
    const directory = process.cwd()

    // 1. Health check endpoint
    app.get("/health", (req, res) => {
      res.status(200).json({
        status: "ok",
        engine: "medusa",
        database: "supabase-postgresql",
        timestamp: new Date().toISOString(),
      })
    })

    // 2. Direct embedded Admin Portal served on Render root & /admin
    app.get(["/", "/admin", "/app", "/admin/login", "/admin/dashboard"], (req, res) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8")
      res.send(getAdminPortalHTML())
    })

    try {
      const { container } = await loaders({
        directory,
        expressApp: app,
      })
      const configModule = container.resolve("configModule")
      const port = process.env.PORT ?? configModule.projectConfig.port ?? 9000

      const server = GracefulShutdownServer.create(
        app.listen(port, (err) => {
          if (err) {
            return
          }
          console.log(`Server is ready on port: ${port}`)
          console.log(`Admin Portal available at: http://localhost:${port}/admin`)
        })
      )

      // Handle graceful shutdown
      const gracefulShutDown = () => {
        server
          .shutdown()
          .then(() => {
            console.info("Gracefully stopping the server.")
            process.exit(0)
          })
          .catch((e) => {
            console.error("Error received when shutting down the server.", e)
            process.exit(1)
          })
      }
      process.on("SIGTERM", gracefulShutDown)
      process.on("SIGINT", gracefulShutDown)
    } catch (err) {
      console.error("Error starting server", err)
      process.exit(1)
    }
  }

  await start()
})()
