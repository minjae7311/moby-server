export const typeDefs = ["type GetUserProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  GetUserProfile: GetUserProfileResponse!\n}\n\ntype User {\n  id: Int!\n  fistName: String!\n  lastName: String!\n  fullName: String\n  profilePhotoUrl: String\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  gender: String!\n  birthDate: String!\n  job: String!\n  password: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype SignUpResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  SignUp(fistName: String!, lastName: String!, profilePhotoUrl: String, phoneNumber: String!, gender: String!, birthDate: String!, job: String!, password: String!): SignUpResponse!\n}\n"];
/* tslint:disable */

export interface Query {
  GetUserProfile: GetUserProfileResponse;
}

export interface GetUserProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface User {
  id: number;
  fistName: string;
  lastName: string;
  fullName: string | null;
  profilePhotoUrl: string | null;
  phoneNumber: string;
  verifiedPhoneNumber: boolean;
  gender: string;
  birthDate: string;
  job: string;
  password: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Mutation {
  SignUp: SignUpResponse;
}

export interface SignUpMutationArgs {
  fistName: string;
  lastName: string;
  profilePhotoUrl: string | null;
  phoneNumber: string;
  gender: string;
  birthDate: string;
  job: string;
  password: string;
}

export interface SignUpResponse {
  ok: boolean;
  error: string | null;
}
