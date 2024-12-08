export interface CurriculumReq {

  curriculumName: string;
  curriculumYearType: string;
  branch: string;
  taggedSub: TaggedSub[];
  createdAdminId: string;
}

export interface TaggedSub {
  taggedSubId: string;
  subject: string;
  isMandatorySub: number;
}

export interface curriculumSub {
  subId: string;
  subject: string;
  branch: string;
}


export interface TaggedSubResponse {
  TaggedSubId: string; // Guid in C# can be represented as string in TypeScript
  Subject: string;
  IsMandatorySub: number; // 1 for mandatory, 0 for optional
}

export interface allCurriculum {
  CurriculumId: string; // Guid in C# can be represented as string in TypeScript
  CumUIId: string; // UI identifier
  CurriculumName: string;
  Branch: string;
  CurriculumYearType: string; // e.g., FE/SE/TE
  taggedSub: TaggedSubResponse[]; // Array of TaggedSubResponseDto
}



