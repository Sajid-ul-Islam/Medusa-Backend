import { TransactionBaseService } from "@medusajs/medusa";
import OnboardingRepository from "../repositories/onboarding";
import { OnboardingState } from "../models/onboarding";
import { EntityManager, IsNull, Not } from "typeorm";
import { UpdateOnboardingStateInput } from "../types/onboarding";

type InjectedDependencies = {
  manager: EntityManager;
  onboardingRepository: typeof OnboardingRepository;
};

class OnboardingService extends TransactionBaseService {
  protected onboardingRepository_: typeof OnboardingRepository;

  constructor({ onboardingRepository }: InjectedDependencies) {
    super(arguments[0]);

    this.onboardingRepository_ = onboardingRepository;
  }

  async retrieve(): Promise<OnboardingState | null> {
    const onboardingRepo = this.activeManager_.withRepository(
      this.onboardingRepository_
    );

    const status = await onboardingRepo.findOne({
      where: { id: Not(IsNull()) },
    });

    return status || null;
  }

  async update(data: UpdateOnboardingStateInput): Promise<OnboardingState | null> {
    return await this.atomicPhase_(
      async (transactionManager: EntityManager) => {
        const onboardingRepository = transactionManager.withRepository(
          this.onboardingRepository_
        );

        let status = await this.retrieve();

        if (!status) {
          status = onboardingRepository.create();
        }

        const updateData = data as Record<string, any>;
        for (const [key, value] of Object.entries(updateData)) {
          (status as any)[key] = value;
        }

        return await onboardingRepository.save(status);
      }
    );
  }
}

export default OnboardingService;
