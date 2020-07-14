export const typeDefs = ["type CreateInterestsResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  CreateInterests(name: String!): CreateInterestsResponse\n  CompletPhoneNumberVerification(phoneNumber: String!, key: String!): CompletPhoneNumberVerificationResponse!\n  SignIn(phoneNumber: String!, password: String!): SignInResponse\n  SignUp(firstName: String!, lastName: String!, profilePhotoUrl: String!, phoneNumber: String!, gender: String!, birthDate: String!, job: String!, password: String!): SignUpResponse!\n}\n\ntype Interests {\n  id: Int!\n  name: String!\n  user: [User]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CompletPhoneNumberVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetUserProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  GetUserProfile: GetUserProfileResponse!\n}\n\ntype User {\n  id: Int!\n  firstName: String!\n  lastName: String!\n  fullName: String\n  profilePhotoUrl: String\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  gender: String!\n  birthDate: String!\n  job: String!\n  password: String!\n  interests: [Interests]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype SignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype SignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
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
  firstName: string;
  lastName: string;
  fullName: string | null;
  profilePhotoUrl: string | null;
  phoneNumber: string;
  verifiedPhoneNumber: boolean;
  gender: string;
  birthDate: string;
  job: string;
  password: string;
  interests: Array<Interests> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Interests {
  id: number;
  name: string;
  user: Array<User> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Mutation {
  CreateInterests: CreateInterestsResponse | null;
  CompletPhoneNumberVerification: CompletPhoneNumberVerificationResponse;
  SignIn: SignInResponse | null;
  SignUp: SignUpResponse;
}

export interface CreateInterestsMutationArgs {
  name: string;
}

export interface CompletPhoneNumberVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface SignInMutationArgs {
  phoneNumber: string;
  password: string;
}

export interface SignUpMutationArgs {
  firstName: string;
  lastName: string;
  profilePhotoUrl: string;
  phoneNumber: string;
  gender: string;
  birthDate: string;
  job: string;
  password: string;
}

export interface CreateInterestsResponse {
  ok: boolean;
  error: string | null;
}

export interface CompletPhoneNumberVerificationResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface SignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface SignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string | null;
}
