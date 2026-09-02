"use client";

import { useState } from "react";
import { Store, Globe, Phone, MapPin, Save, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoreSettingsTabProps {
  initialProfile: {
    name: string;
    tagline: string;
    description: string;
    location: string;
    phone: string;
    website: string;
    subdomain: string;
  };
  onSave: (updated: any) => void;
}

export function StoreSettingsTab({ initialProfile, onSave }: StoreSettingsTabProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border rounded-2xl bg-card p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-foreground">Branded Storefront &amp; Subdomain</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold block mb-1">Store / Publication Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full h-10 px-3 rounded-xl border bg-muted/40 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Storefront Subdomain</label>
            <div className="flex items-center">
              <input
                type="text"
                value={profile.subdomain}
                onChange={(e) => setProfile({ ...profile, subdomain: e.target.value })}
                className="flex-1 h-10 px-3 rounded-l-xl border border-r-0 bg-muted/40 text-xs font-mono focus:ring-2 focus:ring-primary/20 focus:outline-none"
                required
              />
              <span className="h-10 px-3 flex items-center bg-muted border rounded-r-xl text-muted-foreground font-mono">
                .bookhub.com.bd
              </span>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="font-semibold block mb-1">Tagline</label>
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              className="w-full h-10 px-3 rounded-xl border bg-muted/40 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-semibold block mb-1">About the Publisher (Bio)</label>
            <textarea
              rows={3}
              value={profile.description}
              onChange={(e) => setProfile({ ...profile, description: e.target.value })}
              className="w-full p-3 rounded-xl border bg-muted/40 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">HQ Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full h-10 px-3 rounded-xl border bg-muted/40 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Contact Phone</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full h-10 px-3 rounded-xl border bg-muted/40 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          {isSaved ? (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Settings Saved Successfully
            </span>
          ) : <span />}
          <Button type="submit" size="sm" className="rounded-xl font-bold gap-1.5 shadow-sm">
            <Save className="h-4 w-4" /> Save Storefront Settings
          </Button>
        </div>
      </div>
    </form>
  );
}
