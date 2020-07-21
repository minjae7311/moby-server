export const typeDefs = ["type Credit {\n  id: Int!\n  user: User\n  company: String\n  number: String\n  expiringDate: String\n  cvv: String\n  first: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Discount {\n  id: Int!\n  ride: Ride!\n  price: Float!\n  reason: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateInterestsResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  CreateInterests(name: String!): CreateInterestsResponse\n  StartPayment: StartPaymentResponse!\n  CompletPhoneNumberVerification(phoneNumber: String!, key: String!, deviceId: String!): CompletPhoneNumberVerificationResponse!\n  StartPhoneNumberVerification(phoneNumber: String!): StartPhoneNumberVerificationResponse\n  UpdateUserProfile(firstName: String!, lastName: String!, profilePhotoUrl: String!, gender: String!, birthDate: String!, job: String!): UpdateUserProfileResponse!\n}\n\ntype Interests {\n  id: Int!\n  name: String!\n  user: [User]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Payment {\n  id: Int!\n  ride: Ride!\n  credit: Credit\n  price: Float!\n  isCancelled: Boolean!\n  reason: String\n  date: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype StartPaymentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Ride {\n  id: Int!\n  user: User!\n  payment: [Payment]\n  finalFee: Float\n  discount: [Discount]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CompletPhoneNumberVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetUserProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  GetUserProfile: GetUserProfileResponse!\n}\n\ntype User {\n  id: Int!\n  firstName: String\n  lastName: String\n  fullName: String\n  profilePhotoUrl: String\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  gender: String\n  birthDate: String\n  job: String\n  deviceId: String!\n  credit: [Credit]\n  # mainCredit: Credit\n  interests: [Interests]\n  verification: Verification\n  createdAt: String!\n  updatedAt: String\n}\n\ntype StartPhoneNumberVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateUserProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  user: User\n  expired: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
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
  credit: Array<Credit> | null;
  interests: Array<Interests> | null;
  verification: Verification | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Credit {
  id: number;
  user: User | null;
  company: string | null;
  number: string | null;
  expiringDate: string | null;
  cvv: string | null;
  first: boolean;
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
  expired: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface Mutation {
  CreateInterests: CreateInterestsResponse | null;
  StartPayment: StartPaymentResponse;
  CompletPhoneNumberVerification: CompletPhoneNumberVerificationResponse;
  StartPhoneNumberVerification: StartPhoneNumberVerificationResponse | null;
  UpdateUserProfile: UpdateUserProfileResponse;
}

export interface CreateInterestsMutationArgs {
  name: string;
}

export interface CompletPhoneNumberVerificationMutationArgs {
  phoneNumber: string;
  key: string;
  deviceId: string;
}

export interface StartPhoneNumberVerificationMutationArgs {
  phoneNumber: string;
}

export interface UpdateUserProfileMutationArgs {
  firstName: string;
  lastName: string;
  profilePhotoUrl: string;
  gender: string;
  birthDate: string;
  job: string;
}

export interface CreateInterestsResponse {
  ok: boolean;
  error: string | null;
}

export interface StartPaymentResponse {
  ok: boolean;
  error: string | null;
}

export interface CompletPhoneNumberVerificationResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface StartPhoneNumberVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateUserProfileResponse {
  ok: boolean;
  error: string | null;
}

export interface Discount {
  id: number;
  ride: Ride;
  price: number;
  reason: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Ride {
  id: number;
  user: User;
  payment: Array<Payment> | null;
  finalFee: number | null;
  discount: Array<Discount> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Payment {
  id: number;
  ride: Ride;
  credit: Credit | null;
  price: number;
  isCancelled: boolean;
  reason: string | null;
  date: string;
  createdAt: string;
  updatedAt: string | null;
}
