import { z } from "zod";

export const ManifestSchema = z.object({
  accountAssociation: z.object({
    header: z.string(),
    payload: z.string(),
    signature: z.string()
  }),
  frame: z.object({
    name: z.string(),
    iconUrl: z.string(),
    homeUrl: z.string(),
    imageUrl: z.string().optional(),
    buttonTitle: z.string().optional(),
    splashImageUrl: z.string().optional(),
    splashBackgroundColor: z.string().optional(),
    webhookUrl: z.string().optional()
  })
});

export const ProjectConfigSchema = z.object({
  name: z.string(),
  homeUrl: z.string(),
  iconUrl: z.string(),
  description: z.string().optional(),
  categories: z.array(z.string()).optional(),
  screenshots: z.array(z.string()).optional()
});

export const WalletConfigSchema = z.object({
  chainId: z.number(),
  rpcUrl: z.string(),
  explorerUrl: z.string().optional()
});

export type Manifest = z.infer<typeof ManifestSchema>;
export type ProjectConfig = z.infer<typeof ProjectConfigSchema>;
export type WalletConfig = z.infer<typeof WalletConfigSchema>;

export interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl?: string;
  bio?: string;
  verifications?: string[];
}

export interface NotificationConfig {
  token: string;
  title: string;
  body: string;
  targetUrl?: string;
}