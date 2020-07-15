export const typeDefs = ["type CreateInterestsResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  CreateInterests(name: String!): CreateInterestsResponse\n  CompletPhoneNumberVerification(phoneNumber: String!, key: String!, deviceId: String!): CompletPhoneNumberVerificationResponse!\n  InputUserInfo(firstName: String!, lastName: String!, profilePhotoUrl: String!, gender: String!, birthDate: String!, job: String!): InputUserInfoResponse!\n  SignIn(phoneNumber: String!, password: String!): SignInResponse\n  StartPhoneNumberVerification(phoneNumber: String!): StartPhoneNumberVerificationResponse\n}\n\ntype Interests {\n  id: Int!\n  name: String!\n  user: [User]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CompletPhoneNumberVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetUserProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  GetUserProfile: GetUserProfileResponse!\n}\n\ntype InputUserInfoResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  firstName: String\n  lastName: String\n  fullName: String\n  profilePhotoUrl: String\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  gender: String\n  birthDate: String\n  job: String\n  deviceId: String!\n  interests: [Interests]\n  verification: Verification\n  createdAt: String!\n  updatedAt: String\n}\n\ntype SignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype StartPhoneNumberVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  user: User\n  createdAt: String!\n  updatedAt: String\n}\n"];
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
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  profilePhotoUrl: string | null;
  phoneNumber: string;
  verifiedPhoneNumber: boolean;
  gender: string | null;
  birthDate: string | null;
  job: string | null;
  deviceId: string;
  interests: Array<Interests> | null;
  verification: Verification | null;
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

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  user: User | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Mutation {
  CreateInterests: CreateInterestsResponse | null;
  CompletPhoneNumberVerification: CompletPhoneNumberVerificationResponse;
  InputUserInfo: InputUserInfoResponse;
  SignIn: SignInResponse | null;
  StartPhoneNumberVerification: StartPhoneNumberVerificationResponse | null;
}

export interface CreateInterestsMutationArgs {
  name: string;
}

export interface CompletPhoneNumberVerificationMutationArgs {
  phoneNumber: string;
  key: string;
  deviceId: string;
}

export interface InputUserInfoMutationArgs {
  firstName: string;
  lastName: string;
  profilePhotoUrl: string;
  gender: string;
  birthDate: string;
  job: string;
}

export interface SignInMutationArgs {
  phoneNumber: string;
  password: string;
}

export interface StartPhoneNumberVerificationMutationArgs {
  phoneNumber: string;
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

export interface InputUserInfoResponse {
  ok: boolean;
  error: string | null;
}

export interface SignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface StartPhoneNumberVerificationResponse {
  ok: boolean;
  error: string | null;
}
