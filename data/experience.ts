export type Role = {
  title: string;
  start: string;
  end: string;
};

export type CompanyExperience = {
  name: string;
  url: string;
  isCurrentCompany: boolean;
  roles: Role[];
};

// TODO(v2): move experience data to db,
// use null for ongoing roles instead of "present"

export const experiences: CompanyExperience[] = [
  {
    name: "jio platforms limited",
    url: "https://jio.com/platforms",
    isCurrentCompany: true,
    roles: [
      { title: "get (graduate engineer trainee)", start: "2022-06", end: "2023-06" },
      { title: "software developer", start: "2023-06", end: "2024-07" },
      { title: "software development engineer II", start: "2024-07", end: "present" },
    ],
  },
];
