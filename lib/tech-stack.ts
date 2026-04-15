import type { SimpleIcon } from "simple-icons";
import {
  siAlibabacloud,
  siAndroid,
  siAngular,
  siExpress,
  siFirebase,
  siGo,
  siGooglecloud,
  siJenkins,
  siMongodb,
  siMqtt,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siReact,
  siRedis,
  siTailwindcss,
} from "simple-icons";

export type TechEntry = {
  label: string;
  icon: SimpleIcon;
};

const TECH_BY_ID = {
  next: { label: "next.js", icon: siNextdotjs },
  react: { label: "react", icon: siReact },
  node: { label: "node.js", icon: siNodedotjs },
  express: { label: "express", icon: siExpress },
  tailwind: { label: "tailwind css", icon: siTailwindcss },
  postgres: { label: "postgresql", icon: siPostgresql },
  mongo: { label: "mongodb", icon: siMongodb },
  angular: { label: "angular", icon: siAngular },
  go: { label: "go", icon: siGo },
  java: { label: "java", icon: siOpenjdk },
  android: { label: "android", icon: siAndroid },
  firebase: { label: "firebase", icon: siFirebase },
  redis: { label: "redis", icon: siRedis },
  gcp: { label: "google cloud", icon: siGooglecloud },
  jenkins: { label: "jenkins", icon: siJenkins },
  mqtt: { label: "mqtt", icon: siMqtt },
  qwen: { label: "qwen2.5 coder", icon: siAlibabacloud },
} as const satisfies Record<string, TechEntry>;

export type TechId = keyof typeof TECH_BY_ID;

export const techCatalog = TECH_BY_ID;

/** Order for the hero intro strip — subset of the catalog. */
export const HERO_TECH_ORDER = [
  "next",
  "react",
  "node",
  "express",
  "go",
  "tailwind",
  "postgres",
  "mongo",
  "redis",
  "gcp",
  "jenkins",
] as const satisfies readonly TechId[];
