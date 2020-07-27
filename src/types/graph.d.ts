export const typeDefs = ["type SendNewMessageResponse {\n  ok: Boolean!\n  error: String\n  message: Message\n}\n\ntype Mutation {\n  SendNewMessage(text: String!, chatId: Int!, isSenderPassenger: Boolean!): SendNewMessageResponse!\n  EnrollCredit(card_number: String!, expiry: String!): EnrollCreditResponse!\n  AddNewDriver: AddNewDriverResponse!\n  AcceptRequestingRide(rideId: Int!): AcceptRequestingRideResponse!\n  PickoffPassenger(rideId: Int!): PickoffPassengerResponse!\n  PickupPassenger(rideId: Int!): PickupPassengerResponse!\n  UpdateDriverLocation(driverId: DriverInput!, lat: Float!, lng: Float!): UpdateDriverLocationResponse!\n  CreateInterests(name: String!): CreateInterestsResponse\n  StartPayment: StartPaymentResponse!\n  AddPlace(name: String, lat: Float!, lng: Float!, address: String!): AddPlaceResponse!\n  RequestRide(from: PlaceInput!, to: PlaceInput!, finalFee: Float, distance: String, duration: String): RequestRideResponse!\n  CompletPhoneNumberVerification(phoneNumber: String!, key: String!, deviceId: String!): CompletPhoneNumberVerificationResponse!\n  StartPhoneNumberVerification(phoneNumber: String!): StartPhoneNumberVerificationResponse\n  UpdateUserProfile(fullName: String!, profilePhotoUrl: String!, gender: String!, birthDate: String!, job: String!): UpdateUserProfileResponse!\n}\n\ntype Chat {\n  id: Int!\n  messages: [Message]\n  passenger: User!\n  driver: Driver\n  ride: Ride!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  passenger: User\n  driver: Driver\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Subscription {\n  SubscribeNewMessage: Message\n  SubscribeNewRide: Ride\n  SubscribeMyRide: Ride\n}\n\ntype EnrollCreditResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetCreditsResponse {\n  ok: Boolean!\n  error: String\n  credit: [Credit]\n  mainCredit: Credit\n}\n\ntype Query {\n  GetCredits: GetCreditsResponse!\n  GetUserProfile: GetUserProfileResponse!\n}\n\ntype Credit {\n  id: Int!\n  user: User\n  card_name: String\n  card_number: String!\n  expiry: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Discount {\n  id: Int!\n  ride: Ride!\n  price: Float!\n  reason: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddNewDriverResponse {\n  ok: Boolean!\n  error: String\n  driver: Driver\n}\n\ntype AcceptRequestingRideResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype PickoffPassengerResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype PickupPassengerResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Driver {\n  id: Int!\n  lat: Float\n  lng: Float\n  isDriving: Boolean!\n  rides: [Ride]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype UpdateDriverLocationResponse {\n  ok: Boolean!\n  error: String\n}\n\ninput DriverInput {\n  id: Int!\n}\n\ntype CreateInterestsResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Interests {\n  id: Int!\n  name: String!\n  user: [User]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Payment {\n  id: Int!\n  ride: Ride!\n  credit: Credit\n  price: Float!\n  isCancelled: Boolean!\n  reason: String\n  date: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype PaymentResult {\n  ok: Boolean!\n  code: Int\n  error: String\n}\n\ntype StartPaymentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype AddPlaceResponse {\n  ok: Boolean!\n  error: String\n  placeId: Int\n}\n\ntype Place {\n  id: Int!\n  name: String\n  lat: Float!\n  lng: Float!\n  address: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype RequestRideResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n  chat: Chat\n}\n\ninput PlaceInput {\n  id: Int!\n}\n\ntype Ride {\n  id: Int!\n  from: Place\n  to: Place\n  payment: [Payment]\n  finalFee: Float\n  discount: [Discount]\n  passenger: User!\n  driver: Driver\n  status: String!\n  chat: Chat\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CompletPhoneNumberVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetUserProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype User {\n  id: Int!\n  fullName: String\n  profilePhotoUrl: String\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  gender: String\n  birthDate: String\n  job: String\n  deviceId: String!\n  rides: [Ride]\n  credit: [Credit]\n  mainCredit: Credit\n  favPlace: [Place]\n  interests: [Interests]\n  isRiding: Boolean\n  verification: Verification\n  createdAt: String!\n  updatedAt: String\n}\n\ntype StartPhoneNumberVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateUserProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  user: User\n  expired: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetCredits: GetCreditsResponse;
  GetUserProfile: GetUserProfileResponse;
}

export interface GetCreditsResponse {
  ok: boolean;
  error: string | null;
  credit: Array<Credit> | null;
  mainCredit: Credit | null;
}

export interface Credit {
  id: number;
  user: User | null;
  card_name: string | null;
  card_number: string;
  expiry: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  fullName: string | null;
  profilePhotoUrl: string | null;
  phoneNumber: string;
  verifiedPhoneNumber: boolean;
  gender: string | null;
  birthDate: string | null;
  job: string | null;
  deviceId: string;
  rides: Array<Ride> | null;
  credit: Array<Credit> | null;
  mainCredit: Credit | null;
  favPlace: Array<Place> | null;
  interests: Array<Interests> | null;
  isRiding: boolean | null;
  verification: Verification | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Ride {
  id: number;
  from: Place | null;
  to: Place | null;
  payment: Array<Payment> | null;
  finalFee: number | null;
  discount: Array<Discount> | null;
  passenger: User;
  driver: Driver | null;
  status: string;
  chat: Chat | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Place {
  id: number;
  name: string | null;
  lat: number;
  lng: number;
  address: string;
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

export interface Discount {
  id: number;
  ride: Ride;
  price: number;
  reason: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Driver {
  id: number;
  lat: number | null;
  lng: number | null;
  isDriving: boolean;
  rides: Array<Ride> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Chat {
  id: number;
  messages: Array<Message> | null;
  passenger: User;
  driver: Driver | null;
  ride: Ride;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  chat: Chat;
  passenger: User | null;
  driver: Driver | null;
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

export interface GetUserProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  SendNewMessage: SendNewMessageResponse;
  EnrollCredit: EnrollCreditResponse;
  AddNewDriver: AddNewDriverResponse;
  AcceptRequestingRide: AcceptRequestingRideResponse;
  PickoffPassenger: PickoffPassengerResponse;
  PickupPassenger: PickupPassengerResponse;
  UpdateDriverLocation: UpdateDriverLocationResponse;
  CreateInterests: CreateInterestsResponse | null;
  StartPayment: StartPaymentResponse;
  AddPlace: AddPlaceResponse;
  RequestRide: RequestRideResponse;
  CompletPhoneNumberVerification: CompletPhoneNumberVerificationResponse;
  StartPhoneNumberVerification: StartPhoneNumberVerificationResponse | null;
  UpdateUserProfile: UpdateUserProfileResponse;
}

export interface SendNewMessageMutationArgs {
  text: string;
  chatId: number;
  isSenderPassenger: boolean;
}

export interface EnrollCreditMutationArgs {
  card_number: string;
  expiry: string;
}

export interface AcceptRequestingRideMutationArgs {
  rideId: number;
}

export interface PickoffPassengerMutationArgs {
  rideId: number;
}

export interface PickupPassengerMutationArgs {
  rideId: number;
}

export interface UpdateDriverLocationMutationArgs {
  driverId: DriverInput;
  lat: number;
  lng: number;
}

export interface CreateInterestsMutationArgs {
  name: string;
}

export interface AddPlaceMutationArgs {
  name: string | null;
  lat: number;
  lng: number;
  address: string;
}

export interface RequestRideMutationArgs {
  from: PlaceInput;
  to: PlaceInput;
  finalFee: number | null;
  distance: string | null;
  duration: string | null;
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
  fullName: string;
  profilePhotoUrl: string;
  gender: string;
  birthDate: string;
  job: string;
}

export interface SendNewMessageResponse {
  ok: boolean;
  error: string | null;
  message: Message | null;
}

export interface EnrollCreditResponse {
  ok: boolean;
  error: string | null;
}

export interface AddNewDriverResponse {
  ok: boolean;
  error: string | null;
  driver: Driver | null;
}

export interface AcceptRequestingRideResponse {
  ok: boolean;
  error: string | null;
}

export interface PickoffPassengerResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export interface PickupPassengerResponse {
  ok: boolean;
  error: string | null;
}

export interface DriverInput {
  id: number;
}

export interface UpdateDriverLocationResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateInterestsResponse {
  ok: boolean;
  error: string | null;
}

export interface StartPaymentResponse {
  ok: boolean;
  error: string | null;
}

export interface AddPlaceResponse {
  ok: boolean;
  error: string | null;
  placeId: number | null;
}

export interface PlaceInput {
  id: number;
}

export interface RequestRideResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
  chat: Chat | null;
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

export interface Subscription {
  SubscribeNewMessage: Message | null;
  SubscribeNewRide: Ride | null;
  SubscribeMyRide: Ride | null;
}

export interface PaymentResult {
  ok: boolean;
  code: number | null;
  error: string | null;
}
