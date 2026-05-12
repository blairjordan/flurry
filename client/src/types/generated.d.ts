import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigFloat: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  Datetime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

/** All input for the `acknowledgeAlert` mutation. */
export type AcknowledgeAlertInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  playerAlertId?: InputMaybe<Scalars['BigInt']['input']>;
  response?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `acknowledgeAlert` mutation. */
export type AcknowledgeAlertPayload = {
  __typename?: 'AcknowledgeAlertPayload';
  /** Reads a single `Alert` that is related to this `PlayerAlert`. */
  alert?: Maybe<Alert>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Player` that is related to this `PlayerAlert`. */
  player?: Maybe<Player>;
  playerAlert?: Maybe<PlayerAlert>;
  /** An edge for our `PlayerAlert`. May be used by Relay 1. */
  playerAlertEdge?: Maybe<PlayerAlertsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `acknowledgeAlert` mutation. */
export type AcknowledgeAlertPayloadPlayerAlertEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerAlertsOrderBy>>;
};

export type Alert = Node & {
  __typename?: 'Alert';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['BigInt']['output'];
  message?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<Scalars['JSON']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  options: Scalars['JSON']['output'];
  /** Reads and enables pagination through a set of `PlayerAlert`. */
  playerAlerts: PlayerAlertsConnection;
  title?: Maybe<Scalars['String']['output']>;
};


export type AlertPlayerAlertsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerAlertCondition>;
  filter?: InputMaybe<PlayerAlertFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayerAlertsOrderBy>>;
};

/** A condition to be used against `Alert` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AlertCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `message` field. */
  message?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `meta` field. */
  meta?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `options` field. */
  options?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `title` field. */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `Alert` object types. All fields are combined with a logical ‘and.’ */
export type AlertFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AlertFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `message` field. */
  message?: InputMaybe<StringFilter>;
  /** Filter by the object’s `meta` field. */
  meta?: InputMaybe<JsonFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AlertFilter>;
  /** Filter by the object’s `options` field. */
  options?: InputMaybe<JsonFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AlertFilter>>;
  /** Filter by the object’s `title` field. */
  title?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `Alert` */
export type AlertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  options?: InputMaybe<Scalars['JSON']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an update to a `Alert`. Fields that are set will be updated. */
export type AlertPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  options?: InputMaybe<Scalars['JSON']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Alert` values. */
export type AlertsConnection = {
  __typename?: 'AlertsConnection';
  /** A list of edges which contains the `Alert` and cursor to aid in pagination. */
  edges: Array<AlertsEdge>;
  /** A list of `Alert` objects. */
  nodes: Array<Alert>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Alert` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Alert` edge in the connection. */
export type AlertsEdge = {
  __typename?: 'AlertsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Alert` at the end of the edge. */
  node: Alert;
};

/** Methods to use when ordering `Alert`. */
export enum AlertsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MessageAsc = 'MESSAGE_ASC',
  MessageDesc = 'MESSAGE_DESC',
  MetaAsc = 'META_ASC',
  MetaDesc = 'META_DESC',
  Natural = 'NATURAL',
  OptionsAsc = 'OPTIONS_ASC',
  OptionsDesc = 'OPTIONS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC'
}

/** A filter to be used against BigFloat fields. All fields are combined with a logical ‘and.’ */
export type BigFloatFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
};

/** A filter to be used against BigInt fields. All fields are combined with a logical ‘and.’ */
export type BigIntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigInt']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigInt']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigInt']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigInt']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** All input for the `claimDesk` mutation. */
export type ClaimDeskInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  deskMarkerId?: InputMaybe<Scalars['BigInt']['input']>;
};

/** The output of our `claimDesk` mutation. */
export type ClaimDeskPayload = {
  __typename?: 'ClaimDeskPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `Alert` mutation. */
export type CreateAlertInput = {
  /** The `Alert` to be created by this mutation. */
  alert: AlertInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `Alert` mutation. */
export type CreateAlertPayload = {
  __typename?: 'CreateAlertPayload';
  /** The `Alert` that was created by this mutation. */
  alert?: Maybe<Alert>;
  /** An edge for our `Alert`. May be used by Relay 1. */
  alertEdge?: Maybe<AlertsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Alert` mutation. */
export type CreateAlertPayloadAlertEdgeArgs = {
  orderBy?: InputMaybe<Array<AlertsOrderBy>>;
};

/** All input for the `createFeed` mutation. */
export type CreateFeedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  feedName?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
};

/** All input for the `createFeedItem` mutation. */
export type CreateFeedItemInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  feedId?: InputMaybe<Scalars['BigInt']['input']>;
  itemContent?: InputMaybe<Scalars['JSON']['input']>;
};

/** The output of our `createFeedItem` mutation. */
export type CreateFeedItemPayload = {
  __typename?: 'CreateFeedItemPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Feed` that is related to this `FeedItem`. */
  feed?: Maybe<Feed>;
  feedItem?: Maybe<FeedItem>;
  /** An edge for our `FeedItem`. May be used by Relay 1. */
  feedItemEdge?: Maybe<FeedItemsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `createFeedItem` mutation. */
export type CreateFeedItemPayloadFeedItemEdgeArgs = {
  orderBy?: InputMaybe<Array<FeedItemsOrderBy>>;
};

/** The output of our `createFeed` mutation. */
export type CreateFeedPayload = {
  __typename?: 'CreateFeedPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  feed?: Maybe<Feed>;
  /** An edge for our `Feed`. May be used by Relay 1. */
  feedEdge?: Maybe<FeedsEdge>;
  /** Reads a single `Player` that is related to this `Feed`. */
  player?: Maybe<Player>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `createFeed` mutation. */
export type CreateFeedPayloadFeedEdgeArgs = {
  orderBy?: InputMaybe<Array<FeedsOrderBy>>;
};

/** All input for the create `Item` mutation. */
export type CreateItemInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Item` to be created by this mutation. */
  item: ItemInput;
};

/** The output of our create `Item` mutation. */
export type CreateItemPayload = {
  __typename?: 'CreateItemPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Item` that was created by this mutation. */
  item?: Maybe<Item>;
  /** An edge for our `Item`. May be used by Relay 1. */
  itemEdge?: Maybe<ItemsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Item` mutation. */
export type CreateItemPayloadItemEdgeArgs = {
  orderBy?: InputMaybe<Array<ItemsOrderBy>>;
};

/** All input for the create `Marker` mutation. */
export type CreateMarkerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Marker` to be created by this mutation. */
  marker: MarkerInput;
};

/** The output of our create `Marker` mutation. */
export type CreateMarkerPayload = {
  __typename?: 'CreateMarkerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Marker` that was created by this mutation. */
  marker?: Maybe<Marker>;
  /** An edge for our `Marker`. May be used by Relay 1. */
  markerEdge?: Maybe<MarkersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Marker` mutation. */
export type CreateMarkerPayloadMarkerEdgeArgs = {
  orderBy?: InputMaybe<Array<MarkersOrderBy>>;
};

/** All input for the create `Message` mutation. */
export type CreateMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Message` to be created by this mutation. */
  message: MessageInput;
};

/** The output of our create `Message` mutation. */
export type CreateMessagePayload = {
  __typename?: 'CreateMessagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Message` that was created by this mutation. */
  message?: Maybe<Message>;
  /** An edge for our `Message`. May be used by Relay 1. */
  messageEdge?: Maybe<MessagesEdge>;
  /** Reads a single `Player` that is related to this `Message`. */
  player?: Maybe<Player>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Player` that is related to this `Message`. */
  targetPlayer?: Maybe<Player>;
};


/** The output of our create `Message` mutation. */
export type CreateMessagePayloadMessageEdgeArgs = {
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};

/** All input for the create `Pet` mutation. */
export type CreatePetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Pet` to be created by this mutation. */
  pet: PetInput;
};

/** The output of our create `Pet` mutation. */
export type CreatePetPayload = {
  __typename?: 'CreatePetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Pet` that was created by this mutation. */
  pet?: Maybe<Pet>;
  /** An edge for our `Pet`. May be used by Relay 1. */
  petEdge?: Maybe<PetsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Pet` mutation. */
export type CreatePetPayloadPetEdgeArgs = {
  orderBy?: InputMaybe<Array<PetsOrderBy>>;
};

/** All input for the create `PlayerAlert` mutation. */
export type CreatePlayerAlertInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `PlayerAlert` to be created by this mutation. */
  playerAlert: PlayerAlertInput;
};

/** The output of our create `PlayerAlert` mutation. */
export type CreatePlayerAlertPayload = {
  __typename?: 'CreatePlayerAlertPayload';
  /** Reads a single `Alert` that is related to this `PlayerAlert`. */
  alert?: Maybe<Alert>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Player` that is related to this `PlayerAlert`. */
  player?: Maybe<Player>;
  /** The `PlayerAlert` that was created by this mutation. */
  playerAlert?: Maybe<PlayerAlert>;
  /** An edge for our `PlayerAlert`. May be used by Relay 1. */
  playerAlertEdge?: Maybe<PlayerAlertsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PlayerAlert` mutation. */
export type CreatePlayerAlertPayloadPlayerAlertEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerAlertsOrderBy>>;
};

/** All input for the create `Player` mutation. */
export type CreatePlayerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Player` to be created by this mutation. */
  player: PlayerInput;
};

/** All input for the create `PlayerItem` mutation. */
export type CreatePlayerItemInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `PlayerItem` to be created by this mutation. */
  playerItem: PlayerItemInput;
};

/** The output of our create `PlayerItem` mutation. */
export type CreatePlayerItemPayload = {
  __typename?: 'CreatePlayerItemPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Item` that is related to this `PlayerItem`. */
  item?: Maybe<Item>;
  /** Reads a single `Player` that is related to this `PlayerItem`. */
  player?: Maybe<Player>;
  /** The `PlayerItem` that was created by this mutation. */
  playerItem?: Maybe<PlayerItem>;
  /** An edge for our `PlayerItem`. May be used by Relay 1. */
  playerItemEdge?: Maybe<PlayerItemsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PlayerItem` mutation. */
export type CreatePlayerItemPayloadPlayerItemEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerItemsOrderBy>>;
};

/** All input for the create `PlayerMarker` mutation. */
export type CreatePlayerMarkerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `PlayerMarker` to be created by this mutation. */
  playerMarker: PlayerMarkerInput;
};

/** The output of our create `PlayerMarker` mutation. */
export type CreatePlayerMarkerPayload = {
  __typename?: 'CreatePlayerMarkerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Marker` that is related to this `PlayerMarker`. */
  marker?: Maybe<Marker>;
  /** Reads a single `Player` that is related to this `PlayerMarker`. */
  player?: Maybe<Player>;
  /** The `PlayerMarker` that was created by this mutation. */
  playerMarker?: Maybe<PlayerMarker>;
  /** An edge for our `PlayerMarker`. May be used by Relay 1. */
  playerMarkerEdge?: Maybe<PlayerMarkersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PlayerMarker` mutation. */
export type CreatePlayerMarkerPayloadPlayerMarkerEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerMarkersOrderBy>>;
};

/** The output of our create `Player` mutation. */
export type CreatePlayerPayload = {
  __typename?: 'CreatePlayerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Player` that was created by this mutation. */
  player?: Maybe<Player>;
  /** An edge for our `Player`. May be used by Relay 1. */
  playerEdge?: Maybe<PlayersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Player` mutation. */
export type CreatePlayerPayloadPlayerEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayersOrderBy>>;
};

/** All input for the create `PlayerPet` mutation. */
export type CreatePlayerPetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `PlayerPet` to be created by this mutation. */
  playerPet: PlayerPetInput;
};

/** The output of our create `PlayerPet` mutation. */
export type CreatePlayerPetPayload = {
  __typename?: 'CreatePlayerPetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Pet` that is related to this `PlayerPet`. */
  pet?: Maybe<Pet>;
  /** Reads a single `Player` that is related to this `PlayerPet`. */
  player?: Maybe<Player>;
  /** The `PlayerPet` that was created by this mutation. */
  playerPet?: Maybe<PlayerPet>;
  /** An edge for our `PlayerPet`. May be used by Relay 1. */
  playerPetEdge?: Maybe<PlayerPetsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PlayerPet` mutation. */
export type CreatePlayerPetPayloadPlayerPetEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerPetsOrderBy>>;
};

/** All input for the create `PlayerSubscription` mutation. */
export type CreatePlayerSubscriptionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `PlayerSubscription` to be created by this mutation. */
  playerSubscription: PlayerSubscriptionInput;
};

/** The output of our create `PlayerSubscription` mutation. */
export type CreatePlayerSubscriptionPayload = {
  __typename?: 'CreatePlayerSubscriptionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Feed` that is related to this `PlayerSubscription`. */
  feed?: Maybe<Feed>;
  /** Reads a single `Player` that is related to this `PlayerSubscription`. */
  player?: Maybe<Player>;
  /** The `PlayerSubscription` that was created by this mutation. */
  playerSubscription?: Maybe<PlayerSubscription>;
  /** An edge for our `PlayerSubscription`. May be used by Relay 1. */
  playerSubscriptionEdge?: Maybe<PlayerSubscriptionsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PlayerSubscription` mutation. */
export type CreatePlayerSubscriptionPayloadPlayerSubscriptionEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerSubscriptionsOrderBy>>;
};

/** All input for the create `PlayersPrivate` mutation. */
export type CreatePlayersPrivateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `PlayersPrivate` to be created by this mutation. */
  playersPrivate: PlayersPrivateInput;
};

/** The output of our create `PlayersPrivate` mutation. */
export type CreatePlayersPrivatePayload = {
  __typename?: 'CreatePlayersPrivatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Player` that is related to this `PlayersPrivate`. */
  player?: Maybe<Player>;
  /** The `PlayersPrivate` that was created by this mutation. */
  playersPrivate?: Maybe<PlayersPrivate>;
  /** An edge for our `PlayersPrivate`. May be used by Relay 1. */
  playersPrivateEdge?: Maybe<PlayersPrivatesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PlayersPrivate` mutation. */
export type CreatePlayersPrivatePayloadPlayersPrivateEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayersPrivatesOrderBy>>;
};

/** All input for the `createStream` mutation. */
export type CreateStreamInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `createStream` mutation. */
export type CreateStreamPayload = {
  __typename?: 'CreateStreamPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Player` that is related to this `Stream`. */
  player?: Maybe<Player>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  stream?: Maybe<Stream>;
  /** An edge for our `Stream`. May be used by Relay 1. */
  streamEdge?: Maybe<StreamsEdge>;
};


/** The output of our `createStream` mutation. */
export type CreateStreamPayloadStreamEdgeArgs = {
  orderBy?: InputMaybe<Array<StreamsOrderBy>>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

/** All input for the `deleteAlertByNodeId` mutation. */
export type DeleteAlertByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Alert` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteAlert` mutation. */
export type DeleteAlertInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
};

/** The output of our delete `Alert` mutation. */
export type DeleteAlertPayload = {
  __typename?: 'DeleteAlertPayload';
  /** The `Alert` that was deleted by this mutation. */
  alert?: Maybe<Alert>;
  /** An edge for our `Alert`. May be used by Relay 1. */
  alertEdge?: Maybe<AlertsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedAlertNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Alert` mutation. */
export type DeleteAlertPayloadAlertEdgeArgs = {
  orderBy?: InputMaybe<Array<AlertsOrderBy>>;
};

/** All input for the `deleteItemByNodeId` mutation. */
export type DeleteItemByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Item` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteItem` mutation. */
export type DeleteItemInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
};

/** The output of our delete `Item` mutation. */
export type DeleteItemPayload = {
  __typename?: 'DeleteItemPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedItemNodeId?: Maybe<Scalars['ID']['output']>;
  /** The `Item` that was deleted by this mutation. */
  item?: Maybe<Item>;
  /** An edge for our `Item`. May be used by Relay 1. */
  itemEdge?: Maybe<ItemsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Item` mutation. */
export type DeleteItemPayloadItemEdgeArgs = {
  orderBy?: InputMaybe<Array<ItemsOrderBy>>;
};

/** All input for the `deleteMarkerByNodeId` mutation. */
export type DeleteMarkerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Marker` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteMarker` mutation. */
export type DeleteMarkerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
};

/** The output of our delete `Marker` mutation. */
export type DeleteMarkerPayload = {
  __typename?: 'DeleteMarkerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedMarkerNodeId?: Maybe<Scalars['ID']['output']>;
  /** The `Marker` that was deleted by this mutation. */
  marker?: Maybe<Marker>;
  /** An edge for our `Marker`. May be used by Relay 1. */
  markerEdge?: Maybe<MarkersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Marker` mutation. */
export type DeleteMarkerPayloadMarkerEdgeArgs = {
  orderBy?: InputMaybe<Array<MarkersOrderBy>>;
};

/** All input for the `deleteMessageByNodeId` mutation. */
export type DeleteMessageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Message` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteMessage` mutation. */
export type DeleteMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
};

/** The output of our delete `Message` mutation. */
export type DeleteMessagePayload = {
  __typename?: 'DeleteMessagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedMessageNodeId?: Maybe<Scalars['ID']['output']>;
  /** The `Message` that was deleted by this mutation. */
  message?: Maybe<Message>;
  /** An edge for our `Message`. May be used by Relay 1. */
  messageEdge?: Maybe<MessagesEdge>;
  /** Reads a single `Player` that is related to this `Message`. */
  player?: Maybe<Player>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Player` that is related to this `Message`. */
  targetPlayer?: Maybe<Player>;
};


/** The output of our delete `Message` mutation. */
export type DeleteMessagePayloadMessageEdgeArgs = {
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};

/** All input for the `deletePetByNodeId` mutation. */
export type DeletePetByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Pet` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deletePetBySpriteIndex` mutation. */
export type DeletePetBySpriteIndexInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  spriteIndex: Scalars['Int']['input'];
};

/** All input for the `deletePet` mutation. */
export type DeletePetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
};

/** The output of our delete `Pet` mutation. */
export type DeletePetPayload = {
  __typename?: 'DeletePetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedPetNodeId?: Maybe<Scalars['ID']['output']>;
  /** The `Pet` that was deleted by this mutation. */
  pet?: Maybe<Pet>;
  /** An edge for our `Pet`. May be used by Relay 1. */
  petEdge?: Maybe<PetsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Pet` mutation. */
export type DeletePetPayloadPetEdgeArgs = {
  orderBy?: InputMaybe<Array<PetsOrderBy>>;
};

/** All input for the `deletePlayerAlertByNodeId` mutation. */
export type DeletePlayerAlertByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PlayerAlert` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deletePlayerAlert` mutation. */
export type DeletePlayerAlertInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
};

/** The output of our delete `PlayerAlert` mutation. */
export type DeletePlayerAlertPayload = {
  __typename?: 'DeletePlayerAlertPayload';
  /** Reads a single `Alert` that is related to this `PlayerAlert`. */
  alert?: Maybe<Alert>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedPlayerAlertNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Player` that is related to this `PlayerAlert`. */
  player?: Maybe<Player>;
  /** The `PlayerAlert` that was deleted by this mutation. */
  playerAlert?: Maybe<PlayerAlert>;
  /** An edge for our `PlayerAlert`. May be used by Relay 1. */
  playerAlertEdge?: Maybe<PlayerAlertsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PlayerAlert` mutation. */
export type DeletePlayerAlertPayloadPlayerAlertEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerAlertsOrderBy>>;
};

/** All input for the `deletePlayerByNodeId` mutation. */
export type DeletePlayerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Player` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deletePlayerByProviderId` mutation. */
export type DeletePlayerByProviderIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  providerId: Scalars['String']['input'];
};

/** All input for the `deletePlayer` mutation. */
export type DeletePlayerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
};

/** All input for the `deletePlayerItemByNodeId` mutation. */
export type DeletePlayerItemByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PlayerItem` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deletePlayerItem` mutation. */
export type DeletePlayerItemInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
};

/** The output of our delete `PlayerItem` mutation. */
export type DeletePlayerItemPayload = {
  __typename?: 'DeletePlayerItemPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedPlayerItemNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Item` that is related to this `PlayerItem`. */
  item?: Maybe<Item>;
  /** Reads a single `Player` that is related to this `PlayerItem`. */
  player?: Maybe<Player>;
  /** The `PlayerItem` that was deleted by this mutation. */
  playerItem?: Maybe<PlayerItem>;
  /** An edge for our `PlayerItem`. May be used by Relay 1. */
  playerItemEdge?: Maybe<PlayerItemsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PlayerItem` mutation. */
export type DeletePlayerItemPayloadPlayerItemEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerItemsOrderBy>>;
};

/** All input for the `deletePlayerMarkerByNodeId` mutation. */
export type DeletePlayerMarkerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PlayerMarker` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deletePlayerMarker` mutation. */
export type DeletePlayerMarkerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  markerId: Scalars['BigInt']['input'];
  playerId: Scalars['BigInt']['input'];
};

/** The output of our delete `PlayerMarker` mutation. */
export type DeletePlayerMarkerPayload = {
  __typename?: 'DeletePlayerMarkerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedPlayerMarkerNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Marker` that is related to this `PlayerMarker`. */
  marker?: Maybe<Marker>;
  /** Reads a single `Player` that is related to this `PlayerMarker`. */
  player?: Maybe<Player>;
  /** The `PlayerMarker` that was deleted by this mutation. */
  playerMarker?: Maybe<PlayerMarker>;
  /** An edge for our `PlayerMarker`. May be used by Relay 1. */
  playerMarkerEdge?: Maybe<PlayerMarkersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PlayerMarker` mutation. */
export type DeletePlayerMarkerPayloadPlayerMarkerEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerMarkersOrderBy>>;
};

/** The output of our delete `Player` mutation. */
export type DeletePlayerPayload = {
  __typename?: 'DeletePlayerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedPlayerNodeId?: Maybe<Scalars['ID']['output']>;
  /** The `Player` that was deleted by this mutation. */
  player?: Maybe<Player>;
  /** An edge for our `Player`. May be used by Relay 1. */
  playerEdge?: Maybe<PlayersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Player` mutation. */
export type DeletePlayerPayloadPlayerEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayersOrderBy>>;
};

/** All input for the `deletePlayerPetByNodeId` mutation. */
export type DeletePlayerPetByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PlayerPet` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deletePlayerPet` mutation. */
export type DeletePlayerPetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  petId: Scalars['BigInt']['input'];
  playerId: Scalars['BigInt']['input'];
};

/** The output of our delete `PlayerPet` mutation. */
export type DeletePlayerPetPayload = {
  __typename?: 'DeletePlayerPetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedPlayerPetNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Pet` that is related to this `PlayerPet`. */
  pet?: Maybe<Pet>;
  /** Reads a single `Player` that is related to this `PlayerPet`. */
  player?: Maybe<Player>;
  /** The `PlayerPet` that was deleted by this mutation. */
  playerPet?: Maybe<PlayerPet>;
  /** An edge for our `PlayerPet`. May be used by Relay 1. */
  playerPetEdge?: Maybe<PlayerPetsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PlayerPet` mutation. */
export type DeletePlayerPetPayloadPlayerPetEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerPetsOrderBy>>;
};

/** All input for the `deletePlayerSubscriptionByNodeId` mutation. */
export type DeletePlayerSubscriptionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PlayerSubscription` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deletePlayerSubscription` mutation. */
export type DeletePlayerSubscriptionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  feedId: Scalars['BigInt']['input'];
  playerId: Scalars['BigInt']['input'];
};

/** The output of our delete `PlayerSubscription` mutation. */
export type DeletePlayerSubscriptionPayload = {
  __typename?: 'DeletePlayerSubscriptionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedPlayerSubscriptionNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Feed` that is related to this `PlayerSubscription`. */
  feed?: Maybe<Feed>;
  /** Reads a single `Player` that is related to this `PlayerSubscription`. */
  player?: Maybe<Player>;
  /** The `PlayerSubscription` that was deleted by this mutation. */
  playerSubscription?: Maybe<PlayerSubscription>;
  /** An edge for our `PlayerSubscription`. May be used by Relay 1. */
  playerSubscriptionEdge?: Maybe<PlayerSubscriptionsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PlayerSubscription` mutation. */
export type DeletePlayerSubscriptionPayloadPlayerSubscriptionEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerSubscriptionsOrderBy>>;
};

/** All input for the `deletePlayersPrivateByNodeId` mutation. */
export type DeletePlayersPrivateByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PlayersPrivate` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deletePlayersPrivate` mutation. */
export type DeletePlayersPrivateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  playerId: Scalars['BigInt']['input'];
};

/** The output of our delete `PlayersPrivate` mutation. */
export type DeletePlayersPrivatePayload = {
  __typename?: 'DeletePlayersPrivatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedPlayersPrivateNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Player` that is related to this `PlayersPrivate`. */
  player?: Maybe<Player>;
  /** The `PlayersPrivate` that was deleted by this mutation. */
  playersPrivate?: Maybe<PlayersPrivate>;
  /** An edge for our `PlayersPrivate`. May be used by Relay 1. */
  playersPrivateEdge?: Maybe<PlayersPrivatesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PlayersPrivate` mutation. */
export type DeletePlayersPrivatePayloadPlayersPrivateEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayersPrivatesOrderBy>>;
};

export type Feed = Node & {
  __typename?: 'Feed';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `FeedItem`. */
  feedItems: FeedItemsConnection;
  id: Scalars['BigInt']['output'];
  isPublic: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Player` that is related to this `Feed`. */
  player?: Maybe<Player>;
  playerId: Scalars['BigInt']['output'];
  /** Reads and enables pagination through a set of `PlayerSubscription`. */
  playerSubscriptions: PlayerSubscriptionsConnection;
  slug: Scalars['String']['output'];
};


export type FeedFeedItemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FeedItemCondition>;
  filter?: InputMaybe<FeedItemFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FeedItemsOrderBy>>;
};


export type FeedPlayerSubscriptionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerSubscriptionCondition>;
  filter?: InputMaybe<PlayerSubscriptionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayerSubscriptionsOrderBy>>;
};

/** A condition to be used against `Feed` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type FeedCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `isPublic` field. */
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `Feed` object types. All fields are combined with a logical ‘and.’ */
export type FeedFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<FeedFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `isPublic` field. */
  isPublic?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<FeedFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<FeedFilter>>;
  /** Filter by the object’s `playerId` field. */
  playerId?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
};

export type FeedItem = Node & {
  __typename?: 'FeedItem';
  content: Scalars['JSON']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Feed` that is related to this `FeedItem`. */
  feed?: Maybe<Feed>;
  feedId: Scalars['BigInt']['output'];
  id: Scalars['BigInt']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/**
 * A condition to be used against `FeedItem` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type FeedItemCondition = {
  /** Checks for equality with the object’s `content` field. */
  content?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `feedId` field. */
  feedId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']['input']>;
};

/** A filter to be used against `FeedItem` object types. All fields are combined with a logical ‘and.’ */
export type FeedItemFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<FeedItemFilter>>;
  /** Filter by the object’s `content` field. */
  content?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `feedId` field. */
  feedId?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<BigIntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<FeedItemFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<FeedItemFilter>>;
};

/** A connection to a list of `FeedItem` values. */
export type FeedItemsConnection = {
  __typename?: 'FeedItemsConnection';
  /** A list of edges which contains the `FeedItem` and cursor to aid in pagination. */
  edges: Array<FeedItemsEdge>;
  /** A list of `FeedItem` objects. */
  nodes: Array<FeedItem>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `FeedItem` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `FeedItem` edge in the connection. */
export type FeedItemsEdge = {
  __typename?: 'FeedItemsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `FeedItem` at the end of the edge. */
  node: FeedItem;
};

/** Methods to use when ordering `FeedItem`. */
export enum FeedItemsOrderBy {
  ContentAsc = 'CONTENT_ASC',
  ContentDesc = 'CONTENT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  FeedIdAsc = 'FEED_ID_ASC',
  FeedIdDesc = 'FEED_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A connection to a list of `Feed` values. */
export type FeedsConnection = {
  __typename?: 'FeedsConnection';
  /** A list of edges which contains the `Feed` and cursor to aid in pagination. */
  edges: Array<FeedsEdge>;
  /** A list of `Feed` objects. */
  nodes: Array<Feed>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Feed` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Feed` edge in the connection. */
export type FeedsEdge = {
  __typename?: 'FeedsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Feed` at the end of the edge. */
  node: Feed;
};

/** Methods to use when ordering `Feed`. */
export enum FeedsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsPublicAsc = 'IS_PUBLIC_ASC',
  IsPublicDesc = 'IS_PUBLIC_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC'
}

/** All input for the `insertMessage` mutation. */
export type InsertMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  targetPlayerId?: InputMaybe<Scalars['BigInt']['input']>;
};

/** The output of our `insertMessage` mutation. */
export type InsertMessagePayload = {
  __typename?: 'InsertMessagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Item = Node & {
  __typename?: 'Item';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['BigInt']['output'];
  itemKey: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `PlayerItem`. */
  playerItems: PlayerItemsConnection;
  price?: Maybe<Scalars['BigFloat']['output']>;
  props?: Maybe<Scalars['JSON']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};


export type ItemPlayerItemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerItemCondition>;
  filter?: InputMaybe<PlayerItemFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayerItemsOrderBy>>;
};

/** A condition to be used against `Item` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ItemCondition = {
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `itemKey` field. */
  itemKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `price` field. */
  price?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Checks for equality with the object’s `props` field. */
  props?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `Item` object types. All fields are combined with a logical ‘and.’ */
export type ItemFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ItemFilter>>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `itemKey` field. */
  itemKey?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ItemFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ItemFilter>>;
  /** Filter by the object’s `price` field. */
  price?: InputMaybe<BigFloatFilter>;
  /** Filter by the object’s `props` field. */
  props?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `Item` */
export type ItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  itemKey: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price?: InputMaybe<Scalars['BigFloat']['input']>;
  props?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an update to a `Item`. Fields that are set will be updated. */
export type ItemPatch = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  itemKey?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['BigFloat']['input']>;
  props?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Item` values. */
export type ItemsConnection = {
  __typename?: 'ItemsConnection';
  /** A list of edges which contains the `Item` and cursor to aid in pagination. */
  edges: Array<ItemsEdge>;
  /** A list of `Item` objects. */
  nodes: Array<Item>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Item` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Item` edge in the connection. */
export type ItemsEdge = {
  __typename?: 'ItemsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Item` at the end of the edge. */
  node: Item;
};

/** Methods to use when ordering `Item`. */
export enum ItemsOrderBy {
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  ItemKeyAsc = 'ITEM_KEY_ASC',
  ItemKeyDesc = 'ITEM_KEY_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PriceAsc = 'PRICE_ASC',
  PriceDesc = 'PRICE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PropsAsc = 'PROPS_ASC',
  PropsDesc = 'PROPS_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC'
}

/** A filter to be used against JSON fields. All fields are combined with a logical ‘and.’ */
export type JsonFilter = {
  /** Contained by the specified JSON. */
  containedBy?: InputMaybe<Scalars['JSON']['input']>;
  /** Contains the specified JSON. */
  contains?: InputMaybe<Scalars['JSON']['input']>;
  /** Contains all of the specified keys. */
  containsAllKeys?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains any of the specified keys. */
  containsAnyKeys?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains the specified key. */
  containsKey?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['JSON']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['JSON']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['JSON']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['JSON']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['JSON']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['JSON']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['JSON']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['JSON']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['JSON']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['JSON']['input']>>;
};

export type ListenPayload = {
  __typename?: 'ListenPayload';
  /** Our root query field type. Allows us to run any query from our subscription payload. */
  query?: Maybe<Query>;
  relatedNode?: Maybe<Node>;
  relatedNodeId?: Maybe<Scalars['ID']['output']>;
};

export type Marker = Node & {
  __typename?: 'Marker';
  id: Scalars['BigInt']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `PlayerMarker`. */
  playerMarkers: PlayerMarkersConnection;
  props?: Maybe<Scalars['JSON']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};


export type MarkerPlayerMarkersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerMarkerCondition>;
  filter?: InputMaybe<PlayerMarkerFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayerMarkersOrderBy>>;
};

/** A condition to be used against `Marker` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MarkerCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `props` field. */
  props?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `Marker` object types. All fields are combined with a logical ‘and.’ */
export type MarkerFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<MarkerFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<BigIntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<MarkerFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<MarkerFilter>>;
  /** Filter by the object’s `props` field. */
  props?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `Marker` */
export type MarkerInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  props?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an update to a `Marker`. Fields that are set will be updated. */
export type MarkerPatch = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  props?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Marker` values. */
export type MarkersConnection = {
  __typename?: 'MarkersConnection';
  /** A list of edges which contains the `Marker` and cursor to aid in pagination. */
  edges: Array<MarkersEdge>;
  /** A list of `Marker` objects. */
  nodes: Array<Marker>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Marker` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Marker` edge in the connection. */
export type MarkersEdge = {
  __typename?: 'MarkersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Marker` at the end of the edge. */
  node: Marker;
};

/** Methods to use when ordering `Marker`. */
export enum MarkersOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PropsAsc = 'PROPS_ASC',
  PropsDesc = 'PROPS_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC'
}

export type Message = Node & {
  __typename?: 'Message';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['BigInt']['output'];
  isAiGenerated?: Maybe<Scalars['Boolean']['output']>;
  isDirectMessage?: Maybe<Scalars['Boolean']['output']>;
  message: Scalars['String']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Player` that is related to this `Message`. */
  player?: Maybe<Player>;
  playerId: Scalars['BigInt']['output'];
  /** Reads a single `Player` that is related to this `Message`. */
  targetPlayer?: Maybe<Player>;
  targetPlayerId?: Maybe<Scalars['BigInt']['output']>;
};

/** A condition to be used against `Message` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MessageCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `isAiGenerated` field. */
  isAiGenerated?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `isDirectMessage` field. */
  isDirectMessage?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `message` field. */
  message?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `meta` field. */
  meta?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `targetPlayerId` field. */
  targetPlayerId?: InputMaybe<Scalars['BigInt']['input']>;
};

/** A filter to be used against `Message` object types. All fields are combined with a logical ‘and.’ */
export type MessageFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<MessageFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `isAiGenerated` field. */
  isAiGenerated?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `isDirectMessage` field. */
  isDirectMessage?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `message` field. */
  message?: InputMaybe<StringFilter>;
  /** Filter by the object’s `meta` field. */
  meta?: InputMaybe<JsonFilter>;
  /** Negates the expression. */
  not?: InputMaybe<MessageFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<MessageFilter>>;
  /** Filter by the object’s `playerId` field. */
  playerId?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `targetPlayerId` field. */
  targetPlayerId?: InputMaybe<BigIntFilter>;
};

/** An input for mutations affecting `Message` */
export type MessageInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  isAiGenerated?: InputMaybe<Scalars['Boolean']['input']>;
  isDirectMessage?: InputMaybe<Scalars['Boolean']['input']>;
  message: Scalars['String']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  playerId: Scalars['BigInt']['input'];
  targetPlayerId?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Represents an update to a `Message`. Fields that are set will be updated. */
export type MessagePatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  isAiGenerated?: InputMaybe<Scalars['Boolean']['input']>;
  isDirectMessage?: InputMaybe<Scalars['Boolean']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  playerId?: InputMaybe<Scalars['BigInt']['input']>;
  targetPlayerId?: InputMaybe<Scalars['BigInt']['input']>;
};

/** A connection to a list of `Message` values. */
export type MessagesConnection = {
  __typename?: 'MessagesConnection';
  /** A list of edges which contains the `Message` and cursor to aid in pagination. */
  edges: Array<MessagesEdge>;
  /** A list of `Message` objects. */
  nodes: Array<Message>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Message` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Message` edge in the connection. */
export type MessagesEdge = {
  __typename?: 'MessagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Message` at the end of the edge. */
  node: Message;
};

/** Methods to use when ordering `Message`. */
export enum MessagesOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsAiGeneratedAsc = 'IS_AI_GENERATED_ASC',
  IsAiGeneratedDesc = 'IS_AI_GENERATED_DESC',
  IsDirectMessageAsc = 'IS_DIRECT_MESSAGE_ASC',
  IsDirectMessageDesc = 'IS_DIRECT_MESSAGE_DESC',
  MessageAsc = 'MESSAGE_ASC',
  MessageDesc = 'MESSAGE_DESC',
  MetaAsc = 'META_ASC',
  MetaDesc = 'META_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TargetPlayerIdAsc = 'TARGET_PLAYER_ID_ASC',
  TargetPlayerIdDesc = 'TARGET_PLAYER_ID_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  acknowledgeAlert?: Maybe<AcknowledgeAlertPayload>;
  claimDesk?: Maybe<ClaimDeskPayload>;
  /** Creates a single `Alert`. */
  createAlert?: Maybe<CreateAlertPayload>;
  /** Create a new feed for the current player, optionally making it public */
  createFeed?: Maybe<CreateFeedPayload>;
  /** Create a new item in a feed owned by the current player */
  createFeedItem?: Maybe<CreateFeedItemPayload>;
  /** Creates a single `Item`. */
  createItem?: Maybe<CreateItemPayload>;
  /** Creates a single `Marker`. */
  createMarker?: Maybe<CreateMarkerPayload>;
  /** Creates a single `Message`. */
  createMessage?: Maybe<CreateMessagePayload>;
  /** Creates a single `Pet`. */
  createPet?: Maybe<CreatePetPayload>;
  /** Creates a single `Player`. */
  createPlayer?: Maybe<CreatePlayerPayload>;
  /** Creates a single `PlayerAlert`. */
  createPlayerAlert?: Maybe<CreatePlayerAlertPayload>;
  /** Creates a single `PlayerItem`. */
  createPlayerItem?: Maybe<CreatePlayerItemPayload>;
  /** Creates a single `PlayerMarker`. */
  createPlayerMarker?: Maybe<CreatePlayerMarkerPayload>;
  /** Creates a single `PlayerPet`. */
  createPlayerPet?: Maybe<CreatePlayerPetPayload>;
  /** Creates a single `PlayerSubscription`. */
  createPlayerSubscription?: Maybe<CreatePlayerSubscriptionPayload>;
  /** Creates a single `PlayersPrivate`. */
  createPlayersPrivate?: Maybe<CreatePlayersPrivatePayload>;
  createStream?: Maybe<CreateStreamPayload>;
  /** Deletes a single `Alert` using a unique key. */
  deleteAlert?: Maybe<DeleteAlertPayload>;
  /** Deletes a single `Alert` using its globally unique id. */
  deleteAlertByNodeId?: Maybe<DeleteAlertPayload>;
  /** Deletes a single `Item` using a unique key. */
  deleteItem?: Maybe<DeleteItemPayload>;
  /** Deletes a single `Item` using its globally unique id. */
  deleteItemByNodeId?: Maybe<DeleteItemPayload>;
  /** Deletes a single `Marker` using a unique key. */
  deleteMarker?: Maybe<DeleteMarkerPayload>;
  /** Deletes a single `Marker` using its globally unique id. */
  deleteMarkerByNodeId?: Maybe<DeleteMarkerPayload>;
  /** Deletes a single `Message` using a unique key. */
  deleteMessage?: Maybe<DeleteMessagePayload>;
  /** Deletes a single `Message` using its globally unique id. */
  deleteMessageByNodeId?: Maybe<DeleteMessagePayload>;
  /** Deletes a single `Pet` using a unique key. */
  deletePet?: Maybe<DeletePetPayload>;
  /** Deletes a single `Pet` using its globally unique id. */
  deletePetByNodeId?: Maybe<DeletePetPayload>;
  /** Deletes a single `Pet` using a unique key. */
  deletePetBySpriteIndex?: Maybe<DeletePetPayload>;
  /** Deletes a single `Player` using a unique key. */
  deletePlayer?: Maybe<DeletePlayerPayload>;
  /** Deletes a single `PlayerAlert` using a unique key. */
  deletePlayerAlert?: Maybe<DeletePlayerAlertPayload>;
  /** Deletes a single `PlayerAlert` using its globally unique id. */
  deletePlayerAlertByNodeId?: Maybe<DeletePlayerAlertPayload>;
  /** Deletes a single `Player` using its globally unique id. */
  deletePlayerByNodeId?: Maybe<DeletePlayerPayload>;
  /** Deletes a single `Player` using a unique key. */
  deletePlayerByProviderId?: Maybe<DeletePlayerPayload>;
  /** Deletes a single `PlayerItem` using a unique key. */
  deletePlayerItem?: Maybe<DeletePlayerItemPayload>;
  /** Deletes a single `PlayerItem` using its globally unique id. */
  deletePlayerItemByNodeId?: Maybe<DeletePlayerItemPayload>;
  /** Deletes a single `PlayerMarker` using a unique key. */
  deletePlayerMarker?: Maybe<DeletePlayerMarkerPayload>;
  /** Deletes a single `PlayerMarker` using its globally unique id. */
  deletePlayerMarkerByNodeId?: Maybe<DeletePlayerMarkerPayload>;
  /** Deletes a single `PlayerPet` using a unique key. */
  deletePlayerPet?: Maybe<DeletePlayerPetPayload>;
  /** Deletes a single `PlayerPet` using its globally unique id. */
  deletePlayerPetByNodeId?: Maybe<DeletePlayerPetPayload>;
  /** Deletes a single `PlayerSubscription` using a unique key. */
  deletePlayerSubscription?: Maybe<DeletePlayerSubscriptionPayload>;
  /** Deletes a single `PlayerSubscription` using its globally unique id. */
  deletePlayerSubscriptionByNodeId?: Maybe<DeletePlayerSubscriptionPayload>;
  /** Deletes a single `PlayersPrivate` using a unique key. */
  deletePlayersPrivate?: Maybe<DeletePlayersPrivatePayload>;
  /** Deletes a single `PlayersPrivate` using its globally unique id. */
  deletePlayersPrivateByNodeId?: Maybe<DeletePlayersPrivatePayload>;
  insertMessage?: Maybe<InsertMessagePayload>;
  ping?: Maybe<PingPayload>;
  releaseDesk?: Maybe<ReleaseDeskPayload>;
  /** Subscribe the current player to a feed by its slug */
  subscribeFeed?: Maybe<SubscribeFeedPayload>;
  /** Updates a single `Alert` using a unique key and a patch. */
  updateAlert?: Maybe<UpdateAlertPayload>;
  /** Updates a single `Alert` using its globally unique id and a patch. */
  updateAlertByNodeId?: Maybe<UpdateAlertPayload>;
  /** Updates a single `Item` using a unique key and a patch. */
  updateItem?: Maybe<UpdateItemPayload>;
  /** Updates a single `Item` using its globally unique id and a patch. */
  updateItemByNodeId?: Maybe<UpdateItemPayload>;
  /** Updates a single `Marker` using a unique key and a patch. */
  updateMarker?: Maybe<UpdateMarkerPayload>;
  /** Updates a single `Marker` using its globally unique id and a patch. */
  updateMarkerByNodeId?: Maybe<UpdateMarkerPayload>;
  /** Updates a single `Message` using a unique key and a patch. */
  updateMessage?: Maybe<UpdateMessagePayload>;
  /** Updates a single `Message` using its globally unique id and a patch. */
  updateMessageByNodeId?: Maybe<UpdateMessagePayload>;
  /** Updates a single `Pet` using a unique key and a patch. */
  updatePet?: Maybe<UpdatePetPayload>;
  /** Updates a single `Pet` using its globally unique id and a patch. */
  updatePetByNodeId?: Maybe<UpdatePetPayload>;
  /** Updates a single `Pet` using a unique key and a patch. */
  updatePetBySpriteIndex?: Maybe<UpdatePetPayload>;
  /** Updates a single `Player` using a unique key and a patch. */
  updatePlayer?: Maybe<UpdatePlayerPayload>;
  /** Updates a single `PlayerAlert` using a unique key and a patch. */
  updatePlayerAlert?: Maybe<UpdatePlayerAlertPayload>;
  /** Updates a single `PlayerAlert` using its globally unique id and a patch. */
  updatePlayerAlertByNodeId?: Maybe<UpdatePlayerAlertPayload>;
  /** Updates a single `Player` using its globally unique id and a patch. */
  updatePlayerByNodeId?: Maybe<UpdatePlayerPayload>;
  /** Updates a single `Player` using a unique key and a patch. */
  updatePlayerByProviderId?: Maybe<UpdatePlayerPayload>;
  /** Updates a single `PlayerItem` using a unique key and a patch. */
  updatePlayerItem?: Maybe<UpdatePlayerItemPayload>;
  /** Updates a single `PlayerItem` using its globally unique id and a patch. */
  updatePlayerItemByNodeId?: Maybe<UpdatePlayerItemPayload>;
  /** Updates a single `PlayerMarker` using a unique key and a patch. */
  updatePlayerMarker?: Maybe<UpdatePlayerMarkerPayload>;
  /** Updates a single `PlayerMarker` using its globally unique id and a patch. */
  updatePlayerMarkerByNodeId?: Maybe<UpdatePlayerMarkerPayload>;
  /** Updates a single `PlayerPet` using a unique key and a patch. */
  updatePlayerPet?: Maybe<UpdatePlayerPetPayload>;
  /** Updates a single `PlayerPet` using its globally unique id and a patch. */
  updatePlayerPetByNodeId?: Maybe<UpdatePlayerPetPayload>;
  /** Updates a single `PlayersPrivate` using a unique key and a patch. */
  updatePlayersPrivate?: Maybe<UpdatePlayersPrivatePayload>;
  /** Updates a single `PlayersPrivate` using its globally unique id and a patch. */
  updatePlayersPrivateByNodeId?: Maybe<UpdatePlayersPrivatePayload>;
  updateStatus?: Maybe<UpdateStatusPayload>;
  upsertPlayerItem?: Maybe<UpsertPlayerItemPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAcknowledgeAlertArgs = {
  input: AcknowledgeAlertInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationClaimDeskArgs = {
  input: ClaimDeskInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAlertArgs = {
  input: CreateAlertInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateFeedArgs = {
  input: CreateFeedInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateFeedItemArgs = {
  input: CreateFeedItemInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateItemArgs = {
  input: CreateItemInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMarkerArgs = {
  input: CreateMarkerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePetArgs = {
  input: CreatePetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePlayerArgs = {
  input: CreatePlayerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePlayerAlertArgs = {
  input: CreatePlayerAlertInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePlayerItemArgs = {
  input: CreatePlayerItemInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePlayerMarkerArgs = {
  input: CreatePlayerMarkerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePlayerPetArgs = {
  input: CreatePlayerPetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePlayerSubscriptionArgs = {
  input: CreatePlayerSubscriptionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePlayersPrivateArgs = {
  input: CreatePlayersPrivateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateStreamArgs = {
  input: CreateStreamInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAlertArgs = {
  input: DeleteAlertInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAlertByNodeIdArgs = {
  input: DeleteAlertByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItemArgs = {
  input: DeleteItemInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItemByNodeIdArgs = {
  input: DeleteItemByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMarkerArgs = {
  input: DeleteMarkerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMarkerByNodeIdArgs = {
  input: DeleteMarkerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMessageArgs = {
  input: DeleteMessageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMessageByNodeIdArgs = {
  input: DeleteMessageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePetArgs = {
  input: DeletePetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePetByNodeIdArgs = {
  input: DeletePetByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePetBySpriteIndexArgs = {
  input: DeletePetBySpriteIndexInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerArgs = {
  input: DeletePlayerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerAlertArgs = {
  input: DeletePlayerAlertInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerAlertByNodeIdArgs = {
  input: DeletePlayerAlertByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerByNodeIdArgs = {
  input: DeletePlayerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerByProviderIdArgs = {
  input: DeletePlayerByProviderIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerItemArgs = {
  input: DeletePlayerItemInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerItemByNodeIdArgs = {
  input: DeletePlayerItemByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerMarkerArgs = {
  input: DeletePlayerMarkerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerMarkerByNodeIdArgs = {
  input: DeletePlayerMarkerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerPetArgs = {
  input: DeletePlayerPetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerPetByNodeIdArgs = {
  input: DeletePlayerPetByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerSubscriptionArgs = {
  input: DeletePlayerSubscriptionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerSubscriptionByNodeIdArgs = {
  input: DeletePlayerSubscriptionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayersPrivateArgs = {
  input: DeletePlayersPrivateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayersPrivateByNodeIdArgs = {
  input: DeletePlayersPrivateByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationInsertMessageArgs = {
  input: InsertMessageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationPingArgs = {
  input: PingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationReleaseDeskArgs = {
  input: ReleaseDeskInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSubscribeFeedArgs = {
  input: SubscribeFeedInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAlertArgs = {
  input: UpdateAlertInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAlertByNodeIdArgs = {
  input: UpdateAlertByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItemArgs = {
  input: UpdateItemInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItemByNodeIdArgs = {
  input: UpdateItemByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMarkerArgs = {
  input: UpdateMarkerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMarkerByNodeIdArgs = {
  input: UpdateMarkerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMessageByNodeIdArgs = {
  input: UpdateMessageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePetArgs = {
  input: UpdatePetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePetByNodeIdArgs = {
  input: UpdatePetByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePetBySpriteIndexArgs = {
  input: UpdatePetBySpriteIndexInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerArgs = {
  input: UpdatePlayerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerAlertArgs = {
  input: UpdatePlayerAlertInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerAlertByNodeIdArgs = {
  input: UpdatePlayerAlertByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerByNodeIdArgs = {
  input: UpdatePlayerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerByProviderIdArgs = {
  input: UpdatePlayerByProviderIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerItemArgs = {
  input: UpdatePlayerItemInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerItemByNodeIdArgs = {
  input: UpdatePlayerItemByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerMarkerArgs = {
  input: UpdatePlayerMarkerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerMarkerByNodeIdArgs = {
  input: UpdatePlayerMarkerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerPetArgs = {
  input: UpdatePlayerPetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerPetByNodeIdArgs = {
  input: UpdatePlayerPetByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayersPrivateArgs = {
  input: UpdatePlayersPrivateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayersPrivateByNodeIdArgs = {
  input: UpdatePlayersPrivateByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateStatusArgs = {
  input: UpdateStatusInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertPlayerItemArgs = {
  input: UpsertPlayerItemInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

export type Pet = Node & {
  __typename?: 'Pet';
  id: Scalars['BigInt']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `PlayerPet`. */
  playerPets: PlayerPetsConnection;
  spriteIndex: Scalars['Int']['output'];
};


export type PetPlayerPetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerPetCondition>;
  filter?: InputMaybe<PlayerPetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayerPetsOrderBy>>;
};

/** A condition to be used against `Pet` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PetCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `spriteIndex` field. */
  spriteIndex?: InputMaybe<Scalars['Int']['input']>;
};

/** A filter to be used against `Pet` object types. All fields are combined with a logical ‘and.’ */
export type PetFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PetFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<BigIntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PetFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PetFilter>>;
  /** Filter by the object’s `spriteIndex` field. */
  spriteIndex?: InputMaybe<IntFilter>;
};

/** An input for mutations affecting `Pet` */
export type PetInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  spriteIndex: Scalars['Int']['input'];
};

/** Represents an update to a `Pet`. Fields that are set will be updated. */
export type PetPatch = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  spriteIndex?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `Pet` values. */
export type PetsConnection = {
  __typename?: 'PetsConnection';
  /** A list of edges which contains the `Pet` and cursor to aid in pagination. */
  edges: Array<PetsEdge>;
  /** A list of `Pet` objects. */
  nodes: Array<Pet>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Pet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Pet` edge in the connection. */
export type PetsEdge = {
  __typename?: 'PetsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Pet` at the end of the edge. */
  node: Pet;
};

/** Methods to use when ordering `Pet`. */
export enum PetsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SpriteIndexAsc = 'SPRITE_INDEX_ASC',
  SpriteIndexDesc = 'SPRITE_INDEX_DESC'
}

/** All input for the `ping` mutation. */
export type PingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `ping` mutation. */
export type PingPayload = {
  __typename?: 'PingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  player?: Maybe<Player>;
  /** An edge for our `Player`. May be used by Relay 1. */
  playerEdge?: Maybe<PlayersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `ping` mutation. */
export type PingPayloadPlayerEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayersOrderBy>>;
};

export type Player = Node & {
  __typename?: 'Player';
  apiSecret?: Maybe<Scalars['String']['output']>;
  /** Returns the current stream key for the authenticated player. */
  currentStreamKey?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Feed`. */
  feeds: FeedsConnection;
  id: Scalars['BigInt']['output'];
  isOnline?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Message`. */
  messages: MessagesConnection;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByTargetPlayerId: MessagesConnection;
  meta?: Maybe<Scalars['JSON']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `PlayerAlert`. */
  playerAlerts: PlayerAlertsConnection;
  /** Reads and enables pagination through a set of `PlayerItem`. */
  playerItems: PlayerItemsConnection;
  /** Reads and enables pagination through a set of `PlayerMarker`. */
  playerMarkers: PlayerMarkersConnection;
  /** Reads and enables pagination through a set of `PlayerPet`. */
  playerPets: PlayerPetsConnection;
  /** Reads and enables pagination through a set of `PlayerSubscription`. */
  playerSubscriptions: PlayerSubscriptionsConnection;
  /** Reads a single `PlayersPrivate` that is related to this `Player`. */
  playersPrivate?: Maybe<PlayersPrivate>;
  position?: Maybe<Scalars['JSON']['output']>;
  providerId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Stream` that is related to this `Player`. */
  stream?: Maybe<Stream>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  username: Scalars['String']['output'];
  wallets?: Maybe<Scalars['JSON']['output']>;
};


export type PlayerFeedsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FeedCondition>;
  filter?: InputMaybe<FeedFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FeedsOrderBy>>;
};


export type PlayerMessagesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MessageCondition>;
  filter?: InputMaybe<MessageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};


export type PlayerMessagesByTargetPlayerIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MessageCondition>;
  filter?: InputMaybe<MessageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};


export type PlayerPlayerAlertsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerAlertCondition>;
  filter?: InputMaybe<PlayerAlertFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayerAlertsOrderBy>>;
};


export type PlayerPlayerItemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerItemCondition>;
  filter?: InputMaybe<PlayerItemFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayerItemsOrderBy>>;
};


export type PlayerPlayerMarkersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerMarkerCondition>;
  filter?: InputMaybe<PlayerMarkerFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayerMarkersOrderBy>>;
};


export type PlayerPlayerPetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerPetCondition>;
  filter?: InputMaybe<PlayerPetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayerPetsOrderBy>>;
};


export type PlayerPlayerSubscriptionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerSubscriptionCondition>;
  filter?: InputMaybe<PlayerSubscriptionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayerSubscriptionsOrderBy>>;
};

export type PlayerAlert = Node & {
  __typename?: 'PlayerAlert';
  acknowledgedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Alert` that is related to this `PlayerAlert`. */
  alert?: Maybe<Alert>;
  alertId: Scalars['BigInt']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['BigInt']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Player` that is related to this `PlayerAlert`. */
  player?: Maybe<Player>;
  playerId: Scalars['BigInt']['output'];
  response?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `PlayerAlert` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PlayerAlertCondition = {
  /** Checks for equality with the object’s `acknowledgedAt` field. */
  acknowledgedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `alertId` field. */
  alertId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `response` field. */
  response?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `PlayerAlert` object types. All fields are combined with a logical ‘and.’ */
export type PlayerAlertFilter = {
  /** Filter by the object’s `acknowledgedAt` field. */
  acknowledgedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `alertId` field. */
  alertId?: InputMaybe<BigIntFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PlayerAlertFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<BigIntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PlayerAlertFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PlayerAlertFilter>>;
  /** Filter by the object’s `playerId` field. */
  playerId?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `response` field. */
  response?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `PlayerAlert` */
export type PlayerAlertInput = {
  acknowledgedAt?: InputMaybe<Scalars['Datetime']['input']>;
  alertId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  playerId: Scalars['BigInt']['input'];
  response?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an update to a `PlayerAlert`. Fields that are set will be updated. */
export type PlayerAlertPatch = {
  acknowledgedAt?: InputMaybe<Scalars['Datetime']['input']>;
  alertId?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  playerId?: InputMaybe<Scalars['BigInt']['input']>;
  response?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `PlayerAlert` values. */
export type PlayerAlertsConnection = {
  __typename?: 'PlayerAlertsConnection';
  /** A list of edges which contains the `PlayerAlert` and cursor to aid in pagination. */
  edges: Array<PlayerAlertsEdge>;
  /** A list of `PlayerAlert` objects. */
  nodes: Array<PlayerAlert>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PlayerAlert` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PlayerAlert` edge in the connection. */
export type PlayerAlertsEdge = {
  __typename?: 'PlayerAlertsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PlayerAlert` at the end of the edge. */
  node: PlayerAlert;
};

/** Methods to use when ordering `PlayerAlert`. */
export enum PlayerAlertsOrderBy {
  AcknowledgedAtAsc = 'ACKNOWLEDGED_AT_ASC',
  AcknowledgedAtDesc = 'ACKNOWLEDGED_AT_DESC',
  AlertIdAsc = 'ALERT_ID_ASC',
  AlertIdDesc = 'ALERT_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ResponseAsc = 'RESPONSE_ASC',
  ResponseDesc = 'RESPONSE_DESC'
}

/** A condition to be used against `Player` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PlayerCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `meta` field. */
  meta?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `position` field. */
  position?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `providerId` field. */
  providerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `username` field. */
  username?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `wallets` field. */
  wallets?: InputMaybe<Scalars['JSON']['input']>;
};

/** A filter to be used against `Player` object types. All fields are combined with a logical ‘and.’ */
export type PlayerFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PlayerFilter>>;
  /** Filter by the object’s `apiSecret` field. */
  apiSecret?: InputMaybe<StringFilter>;
  /** Filter by the object’s `currentStreamKey` field. */
  currentStreamKey?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `isOnline` field. */
  isOnline?: InputMaybe<StringFilter>;
  /** Filter by the object’s `meta` field. */
  meta?: InputMaybe<JsonFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PlayerFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PlayerFilter>>;
  /** Filter by the object’s `position` field. */
  position?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `providerId` field. */
  providerId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `username` field. */
  username?: InputMaybe<StringFilter>;
  /** Filter by the object’s `wallets` field. */
  wallets?: InputMaybe<JsonFilter>;
};

/** An input for mutations affecting `Player` */
export type PlayerInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  position?: InputMaybe<Scalars['JSON']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  username: Scalars['String']['input'];
  wallets?: InputMaybe<Scalars['JSON']['input']>;
};

export type PlayerItem = Node & {
  __typename?: 'PlayerItem';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['BigInt']['output'];
  isEquipped?: Maybe<Scalars['Boolean']['output']>;
  /** Reads a single `Item` that is related to this `PlayerItem`. */
  item?: Maybe<Item>;
  itemId: Scalars['BigInt']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Player` that is related to this `PlayerItem`. */
  player?: Maybe<Player>;
  playerId: Scalars['BigInt']['output'];
  props?: Maybe<Scalars['JSON']['output']>;
};

/**
 * A condition to be used against `PlayerItem` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PlayerItemCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `isEquipped` field. */
  isEquipped?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `itemId` field. */
  itemId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `props` field. */
  props?: InputMaybe<Scalars['JSON']['input']>;
};

/** A filter to be used against `PlayerItem` object types. All fields are combined with a logical ‘and.’ */
export type PlayerItemFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PlayerItemFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `isEquipped` field. */
  isEquipped?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `itemId` field. */
  itemId?: InputMaybe<BigIntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PlayerItemFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PlayerItemFilter>>;
  /** Filter by the object’s `playerId` field. */
  playerId?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `props` field. */
  props?: InputMaybe<JsonFilter>;
};

/** An input for mutations affecting `PlayerItem` */
export type PlayerItemInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  isEquipped?: InputMaybe<Scalars['Boolean']['input']>;
  itemId: Scalars['BigInt']['input'];
  playerId: Scalars['BigInt']['input'];
  props?: InputMaybe<Scalars['JSON']['input']>;
};

/** Represents an update to a `PlayerItem`. Fields that are set will be updated. */
export type PlayerItemPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  isEquipped?: InputMaybe<Scalars['Boolean']['input']>;
  itemId?: InputMaybe<Scalars['BigInt']['input']>;
  playerId?: InputMaybe<Scalars['BigInt']['input']>;
  props?: InputMaybe<Scalars['JSON']['input']>;
};

/** A connection to a list of `PlayerItem` values. */
export type PlayerItemsConnection = {
  __typename?: 'PlayerItemsConnection';
  /** A list of edges which contains the `PlayerItem` and cursor to aid in pagination. */
  edges: Array<PlayerItemsEdge>;
  /** A list of `PlayerItem` objects. */
  nodes: Array<PlayerItem>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PlayerItem` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PlayerItem` edge in the connection. */
export type PlayerItemsEdge = {
  __typename?: 'PlayerItemsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PlayerItem` at the end of the edge. */
  node: PlayerItem;
};

/** Methods to use when ordering `PlayerItem`. */
export enum PlayerItemsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsEquippedAsc = 'IS_EQUIPPED_ASC',
  IsEquippedDesc = 'IS_EQUIPPED_DESC',
  ItemIdAsc = 'ITEM_ID_ASC',
  ItemIdDesc = 'ITEM_ID_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PropsAsc = 'PROPS_ASC',
  PropsDesc = 'PROPS_DESC'
}

export type PlayerMarker = Node & {
  __typename?: 'PlayerMarker';
  /** Reads a single `Marker` that is related to this `PlayerMarker`. */
  marker?: Maybe<Marker>;
  markerId: Scalars['BigInt']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Player` that is related to this `PlayerMarker`. */
  player?: Maybe<Player>;
  playerId: Scalars['BigInt']['output'];
  props?: Maybe<Scalars['JSON']['output']>;
};

/**
 * A condition to be used against `PlayerMarker` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PlayerMarkerCondition = {
  /** Checks for equality with the object’s `markerId` field. */
  markerId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `props` field. */
  props?: InputMaybe<Scalars['JSON']['input']>;
};

/** A filter to be used against `PlayerMarker` object types. All fields are combined with a logical ‘and.’ */
export type PlayerMarkerFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PlayerMarkerFilter>>;
  /** Filter by the object’s `markerId` field. */
  markerId?: InputMaybe<BigIntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PlayerMarkerFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PlayerMarkerFilter>>;
  /** Filter by the object’s `playerId` field. */
  playerId?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `props` field. */
  props?: InputMaybe<JsonFilter>;
};

/** An input for mutations affecting `PlayerMarker` */
export type PlayerMarkerInput = {
  markerId: Scalars['BigInt']['input'];
  playerId: Scalars['BigInt']['input'];
  props?: InputMaybe<Scalars['JSON']['input']>;
};

/** Represents an update to a `PlayerMarker`. Fields that are set will be updated. */
export type PlayerMarkerPatch = {
  markerId?: InputMaybe<Scalars['BigInt']['input']>;
  playerId?: InputMaybe<Scalars['BigInt']['input']>;
  props?: InputMaybe<Scalars['JSON']['input']>;
};

/** A connection to a list of `PlayerMarker` values. */
export type PlayerMarkersConnection = {
  __typename?: 'PlayerMarkersConnection';
  /** A list of edges which contains the `PlayerMarker` and cursor to aid in pagination. */
  edges: Array<PlayerMarkersEdge>;
  /** A list of `PlayerMarker` objects. */
  nodes: Array<PlayerMarker>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PlayerMarker` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PlayerMarker` edge in the connection. */
export type PlayerMarkersEdge = {
  __typename?: 'PlayerMarkersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PlayerMarker` at the end of the edge. */
  node: PlayerMarker;
};

/** Methods to use when ordering `PlayerMarker`. */
export enum PlayerMarkersOrderBy {
  MarkerIdAsc = 'MARKER_ID_ASC',
  MarkerIdDesc = 'MARKER_ID_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PropsAsc = 'PROPS_ASC',
  PropsDesc = 'PROPS_DESC'
}

/** Represents an update to a `Player`. Fields that are set will be updated. */
export type PlayerPatch = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  position?: InputMaybe<Scalars['JSON']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  wallets?: InputMaybe<Scalars['JSON']['input']>;
};

export type PlayerPet = Node & {
  __typename?: 'PlayerPet';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  level: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Pet` that is related to this `PlayerPet`. */
  pet?: Maybe<Pet>;
  petId: Scalars['BigInt']['output'];
  /** Reads a single `Player` that is related to this `PlayerPet`. */
  player?: Maybe<Player>;
  playerId: Scalars['BigInt']['output'];
  xp: Scalars['Int']['output'];
};

/**
 * A condition to be used against `PlayerPet` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PlayerPetCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `level` field. */
  level?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `petId` field. */
  petId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `xp` field. */
  xp?: InputMaybe<Scalars['Int']['input']>;
};

/** A filter to be used against `PlayerPet` object types. All fields are combined with a logical ‘and.’ */
export type PlayerPetFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PlayerPetFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `level` field. */
  level?: InputMaybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PlayerPetFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PlayerPetFilter>>;
  /** Filter by the object’s `petId` field. */
  petId?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `playerId` field. */
  playerId?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `xp` field. */
  xp?: InputMaybe<IntFilter>;
};

/** An input for mutations affecting `PlayerPet` */
export type PlayerPetInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  level?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  petId: Scalars['BigInt']['input'];
  playerId: Scalars['BigInt']['input'];
  xp?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents an update to a `PlayerPet`. Fields that are set will be updated. */
export type PlayerPetPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  level?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  petId?: InputMaybe<Scalars['BigInt']['input']>;
  playerId?: InputMaybe<Scalars['BigInt']['input']>;
  xp?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `PlayerPet` values. */
export type PlayerPetsConnection = {
  __typename?: 'PlayerPetsConnection';
  /** A list of edges which contains the `PlayerPet` and cursor to aid in pagination. */
  edges: Array<PlayerPetsEdge>;
  /** A list of `PlayerPet` objects. */
  nodes: Array<PlayerPet>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PlayerPet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PlayerPet` edge in the connection. */
export type PlayerPetsEdge = {
  __typename?: 'PlayerPetsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PlayerPet` at the end of the edge. */
  node: PlayerPet;
};

/** Methods to use when ordering `PlayerPet`. */
export enum PlayerPetsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PetIdAsc = 'PET_ID_ASC',
  PetIdDesc = 'PET_ID_DESC',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  XpAsc = 'XP_ASC',
  XpDesc = 'XP_DESC'
}

export type PlayerSubscription = Node & {
  __typename?: 'PlayerSubscription';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Feed` that is related to this `PlayerSubscription`. */
  feed?: Maybe<Feed>;
  feedId: Scalars['BigInt']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Player` that is related to this `PlayerSubscription`. */
  player?: Maybe<Player>;
  playerId: Scalars['BigInt']['output'];
};

/**
 * A condition to be used against `PlayerSubscription` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PlayerSubscriptionCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `feedId` field. */
  feedId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']['input']>;
};

/** A filter to be used against `PlayerSubscription` object types. All fields are combined with a logical ‘and.’ */
export type PlayerSubscriptionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PlayerSubscriptionFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `feedId` field. */
  feedId?: InputMaybe<BigIntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PlayerSubscriptionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PlayerSubscriptionFilter>>;
  /** Filter by the object’s `playerId` field. */
  playerId?: InputMaybe<BigIntFilter>;
};

/** An input for mutations affecting `PlayerSubscription` */
export type PlayerSubscriptionInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  feedId: Scalars['BigInt']['input'];
  playerId: Scalars['BigInt']['input'];
};

/** A connection to a list of `PlayerSubscription` values. */
export type PlayerSubscriptionsConnection = {
  __typename?: 'PlayerSubscriptionsConnection';
  /** A list of edges which contains the `PlayerSubscription` and cursor to aid in pagination. */
  edges: Array<PlayerSubscriptionsEdge>;
  /** A list of `PlayerSubscription` objects. */
  nodes: Array<PlayerSubscription>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PlayerSubscription` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PlayerSubscription` edge in the connection. */
export type PlayerSubscriptionsEdge = {
  __typename?: 'PlayerSubscriptionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PlayerSubscription` at the end of the edge. */
  node: PlayerSubscription;
};

/** Methods to use when ordering `PlayerSubscription`. */
export enum PlayerSubscriptionsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  FeedIdAsc = 'FEED_ID_ASC',
  FeedIdDesc = 'FEED_ID_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A connection to a list of `Player` values. */
export type PlayersConnection = {
  __typename?: 'PlayersConnection';
  /** A list of edges which contains the `Player` and cursor to aid in pagination. */
  edges: Array<PlayersEdge>;
  /** A list of `Player` objects. */
  nodes: Array<Player>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Player` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Player` edge in the connection. */
export type PlayersEdge = {
  __typename?: 'PlayersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Player` at the end of the edge. */
  node: Player;
};

/** Methods to use when ordering `Player`. */
export enum PlayersOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MetaAsc = 'META_ASC',
  MetaDesc = 'META_DESC',
  Natural = 'NATURAL',
  PositionAsc = 'POSITION_ASC',
  PositionDesc = 'POSITION_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProviderIdAsc = 'PROVIDER_ID_ASC',
  ProviderIdDesc = 'PROVIDER_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  WalletsAsc = 'WALLETS_ASC',
  WalletsDesc = 'WALLETS_DESC'
}

export type PlayersPrivate = Node & {
  __typename?: 'PlayersPrivate';
  aiPrompt?: Maybe<Scalars['String']['output']>;
  assistantId?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Player` that is related to this `PlayersPrivate`. */
  player?: Maybe<Player>;
  playerId: Scalars['BigInt']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

/**
 * A condition to be used against `PlayersPrivate` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PlayersPrivateCondition = {
  /** Checks for equality with the object’s `aiPrompt` field. */
  aiPrompt?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `assistantId` field. */
  assistantId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against `PlayersPrivate` object types. All fields are combined with a logical ‘and.’ */
export type PlayersPrivateFilter = {
  /** Filter by the object’s `aiPrompt` field. */
  aiPrompt?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PlayersPrivateFilter>>;
  /** Filter by the object’s `assistantId` field. */
  assistantId?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PlayersPrivateFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PlayersPrivateFilter>>;
  /** Filter by the object’s `playerId` field. */
  playerId?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `PlayersPrivate` */
export type PlayersPrivateInput = {
  aiPrompt?: InputMaybe<Scalars['String']['input']>;
  assistantId?: InputMaybe<Scalars['String']['input']>;
  playerId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Represents an update to a `PlayersPrivate`. Fields that are set will be updated. */
export type PlayersPrivatePatch = {
  aiPrompt?: InputMaybe<Scalars['String']['input']>;
  assistantId?: InputMaybe<Scalars['String']['input']>;
  playerId?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `PlayersPrivate` values. */
export type PlayersPrivatesConnection = {
  __typename?: 'PlayersPrivatesConnection';
  /** A list of edges which contains the `PlayersPrivate` and cursor to aid in pagination. */
  edges: Array<PlayersPrivatesEdge>;
  /** A list of `PlayersPrivate` objects. */
  nodes: Array<PlayersPrivate>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PlayersPrivate` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PlayersPrivate` edge in the connection. */
export type PlayersPrivatesEdge = {
  __typename?: 'PlayersPrivatesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PlayersPrivate` at the end of the edge. */
  node: PlayersPrivate;
};

/** Methods to use when ordering `PlayersPrivate`. */
export enum PlayersPrivatesOrderBy {
  AiPromptAsc = 'AI_PROMPT_ASC',
  AiPromptDesc = 'AI_PROMPT_DESC',
  AssistantIdAsc = 'ASSISTANT_ID_ASC',
  AssistantIdDesc = 'ASSISTANT_ID_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  alert?: Maybe<Alert>;
  /** Reads a single `Alert` using its globally unique `ID`. */
  alertByNodeId?: Maybe<Alert>;
  /** Reads and enables pagination through a set of `Alert`. */
  alerts?: Maybe<AlertsConnection>;
  currentPlayer?: Maybe<Player>;
  currentPlayerId?: Maybe<Scalars['BigInt']['output']>;
  currentPlayerProviderId?: Maybe<Scalars['String']['output']>;
  feed?: Maybe<Feed>;
  /** Reads a single `Feed` using its globally unique `ID`. */
  feedByNodeId?: Maybe<Feed>;
  feedByPlayerIdAndName?: Maybe<Feed>;
  feedItem?: Maybe<FeedItem>;
  /** Reads a single `FeedItem` using its globally unique `ID`. */
  feedItemByNodeId?: Maybe<FeedItem>;
  /** Reads and enables pagination through a set of `FeedItem`. */
  feedItems?: Maybe<FeedItemsConnection>;
  /** Reads and enables pagination through a set of `Feed`. */
  feeds?: Maybe<FeedsConnection>;
  item?: Maybe<Item>;
  /** Reads a single `Item` using its globally unique `ID`. */
  itemByNodeId?: Maybe<Item>;
  /** Reads and enables pagination through a set of `Item`. */
  items?: Maybe<ItemsConnection>;
  marker?: Maybe<Marker>;
  /** Reads a single `Marker` using its globally unique `ID`. */
  markerByNodeId?: Maybe<Marker>;
  /** Reads and enables pagination through a set of `Marker`. */
  markers?: Maybe<MarkersConnection>;
  message?: Maybe<Message>;
  /** Reads a single `Message` using its globally unique `ID`. */
  messageByNodeId?: Maybe<Message>;
  /** Reads and enables pagination through a set of `Message`. */
  messages?: Maybe<MessagesConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output'];
  pet?: Maybe<Pet>;
  /** Reads a single `Pet` using its globally unique `ID`. */
  petByNodeId?: Maybe<Pet>;
  petBySpriteIndex?: Maybe<Pet>;
  /** Reads and enables pagination through a set of `Pet`. */
  pets?: Maybe<PetsConnection>;
  player?: Maybe<Player>;
  playerAlert?: Maybe<PlayerAlert>;
  /** Reads a single `PlayerAlert` using its globally unique `ID`. */
  playerAlertByNodeId?: Maybe<PlayerAlert>;
  /** Reads and enables pagination through a set of `PlayerAlert`. */
  playerAlerts?: Maybe<PlayerAlertsConnection>;
  /** Reads a single `Player` using its globally unique `ID`. */
  playerByNodeId?: Maybe<Player>;
  playerByProviderId?: Maybe<Player>;
  playerItem?: Maybe<PlayerItem>;
  /** Reads a single `PlayerItem` using its globally unique `ID`. */
  playerItemByNodeId?: Maybe<PlayerItem>;
  /** Reads and enables pagination through a set of `PlayerItem`. */
  playerItems?: Maybe<PlayerItemsConnection>;
  playerMarker?: Maybe<PlayerMarker>;
  /** Reads a single `PlayerMarker` using its globally unique `ID`. */
  playerMarkerByNodeId?: Maybe<PlayerMarker>;
  /** Reads and enables pagination through a set of `PlayerMarker`. */
  playerMarkers?: Maybe<PlayerMarkersConnection>;
  playerPet?: Maybe<PlayerPet>;
  /** Reads a single `PlayerPet` using its globally unique `ID`. */
  playerPetByNodeId?: Maybe<PlayerPet>;
  /** Reads and enables pagination through a set of `PlayerPet`. */
  playerPets?: Maybe<PlayerPetsConnection>;
  playerSubscription?: Maybe<PlayerSubscription>;
  /** Reads a single `PlayerSubscription` using its globally unique `ID`. */
  playerSubscriptionByNodeId?: Maybe<PlayerSubscription>;
  /** Reads and enables pagination through a set of `PlayerSubscription`. */
  playerSubscriptions?: Maybe<PlayerSubscriptionsConnection>;
  /** Reads and enables pagination through a set of `Player`. */
  players?: Maybe<PlayersConnection>;
  playersPrivate?: Maybe<PlayersPrivate>;
  /** Reads a single `PlayersPrivate` using its globally unique `ID`. */
  playersPrivateByNodeId?: Maybe<PlayersPrivate>;
  /** Reads and enables pagination through a set of `PlayersPrivate`. */
  playersPrivates?: Maybe<PlayersPrivatesConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  stream?: Maybe<Stream>;
  /** Reads a single `Stream` using its globally unique `ID`. */
  streamByNodeId?: Maybe<Stream>;
  streamByPlayerId?: Maybe<Stream>;
  /** Reads and enables pagination through a set of `Stream`. */
  streams?: Maybe<StreamsConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAlertArgs = {
  id: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAlertByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAlertsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AlertCondition>;
  filter?: InputMaybe<AlertFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlertsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFeedArgs = {
  id: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFeedByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFeedByPlayerIdAndNameArgs = {
  name: Scalars['String']['input'];
  playerId: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFeedItemArgs = {
  id: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFeedItemByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFeedItemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FeedItemCondition>;
  filter?: InputMaybe<FeedItemFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FeedItemsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFeedsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FeedCondition>;
  filter?: InputMaybe<FeedFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FeedsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryItemArgs = {
  id: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryItemByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryItemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ItemCondition>;
  filter?: InputMaybe<ItemFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ItemsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMarkerArgs = {
  id: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMarkerByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMarkersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MarkerCondition>;
  filter?: InputMaybe<MarkerFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MarkersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMessageArgs = {
  id: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMessageByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMessagesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MessageCondition>;
  filter?: InputMaybe<MessageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPetArgs = {
  id: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPetByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPetBySpriteIndexArgs = {
  spriteIndex: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PetCondition>;
  filter?: InputMaybe<PetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PetsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerArgs = {
  id: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerAlertArgs = {
  id: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerAlertByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerAlertsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerAlertCondition>;
  filter?: InputMaybe<PlayerAlertFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayerAlertsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerByProviderIdArgs = {
  providerId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerItemArgs = {
  id: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerItemByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerItemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerItemCondition>;
  filter?: InputMaybe<PlayerItemFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayerItemsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerMarkerArgs = {
  markerId: Scalars['BigInt']['input'];
  playerId: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerMarkerByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerMarkersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerMarkerCondition>;
  filter?: InputMaybe<PlayerMarkerFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayerMarkersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerPetArgs = {
  petId: Scalars['BigInt']['input'];
  playerId: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerPetByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerPetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerPetCondition>;
  filter?: InputMaybe<PlayerPetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayerPetsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerSubscriptionArgs = {
  feedId: Scalars['BigInt']['input'];
  playerId: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerSubscriptionByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerSubscriptionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerSubscriptionCondition>;
  filter?: InputMaybe<PlayerSubscriptionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayerSubscriptionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayerCondition>;
  filter?: InputMaybe<PlayerFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayersPrivateArgs = {
  playerId: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayersPrivateByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayersPrivatesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PlayersPrivateCondition>;
  filter?: InputMaybe<PlayersPrivateFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PlayersPrivatesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryStreamArgs = {
  id: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStreamByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStreamByPlayerIdArgs = {
  playerId: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStreamsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<StreamCondition>;
  filter?: InputMaybe<StreamFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StreamsOrderBy>>;
};

/** All input for the `releaseDesk` mutation. */
export type ReleaseDeskInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `releaseDesk` mutation. */
export type ReleaseDeskPayload = {
  __typename?: 'ReleaseDeskPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

export type Stream = Node & {
  __typename?: 'Stream';
  id: Scalars['BigInt']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Player` that is related to this `Stream`. */
  player?: Maybe<Player>;
  playerId: Scalars['BigInt']['output'];
  providerId?: Maybe<Scalars['String']['output']>;
  rtmpsUrl?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  viewerUrl?: Maybe<Scalars['String']['output']>;
};

/** A condition to be used against `Stream` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type StreamCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `meta` field. */
  meta?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `providerId` field. */
  providerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rtmpsUrl` field. */
  rtmpsUrl?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `viewerUrl` field. */
  viewerUrl?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `Stream` object types. All fields are combined with a logical ‘and.’ */
export type StreamFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<StreamFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `meta` field. */
  meta?: InputMaybe<JsonFilter>;
  /** Negates the expression. */
  not?: InputMaybe<StreamFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<StreamFilter>>;
  /** Filter by the object’s `playerId` field. */
  playerId?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `providerId` field. */
  providerId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rtmpsUrl` field. */
  rtmpsUrl?: InputMaybe<StringFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `viewerUrl` field. */
  viewerUrl?: InputMaybe<StringFilter>;
};

/** A connection to a list of `Stream` values. */
export type StreamsConnection = {
  __typename?: 'StreamsConnection';
  /** A list of edges which contains the `Stream` and cursor to aid in pagination. */
  edges: Array<StreamsEdge>;
  /** A list of `Stream` objects. */
  nodes: Array<Stream>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Stream` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Stream` edge in the connection. */
export type StreamsEdge = {
  __typename?: 'StreamsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Stream` at the end of the edge. */
  node: Stream;
};

/** Methods to use when ordering `Stream`. */
export enum StreamsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MetaAsc = 'META_ASC',
  MetaDesc = 'META_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProviderIdAsc = 'PROVIDER_ID_ASC',
  ProviderIdDesc = 'PROVIDER_ID_DESC',
  RtmpsUrlAsc = 'RTMPS_URL_ASC',
  RtmpsUrlDesc = 'RTMPS_URL_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  ViewerUrlAsc = 'VIEWER_URL_ASC',
  ViewerUrlDesc = 'VIEWER_URL_DESC'
}

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']['input']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']['input']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']['input']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
};

/** All input for the `subscribeFeed` mutation. */
export type SubscribeFeedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  feedSlug?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `subscribeFeed` mutation. */
export type SubscribeFeedPayload = {
  __typename?: 'SubscribeFeedPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Feed` that is related to this `PlayerSubscription`. */
  feed?: Maybe<Feed>;
  /** Reads a single `Player` that is related to this `PlayerSubscription`. */
  player?: Maybe<Player>;
  playerSubscription?: Maybe<PlayerSubscription>;
  /** An edge for our `PlayerSubscription`. May be used by Relay 1. */
  playerSubscriptionEdge?: Maybe<PlayerSubscriptionsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `subscribeFeed` mutation. */
export type SubscribeFeedPayloadPlayerSubscriptionEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerSubscriptionsOrderBy>>;
};

/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type Subscription = {
  __typename?: 'Subscription';
  listen: ListenPayload;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type SubscriptionListenArgs = {
  topic: Scalars['String']['input'];
};

/** All input for the `updateAlertByNodeId` mutation. */
export type UpdateAlertByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Alert` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Alert` being updated. */
  patch: AlertPatch;
};

/** All input for the `updateAlert` mutation. */
export type UpdateAlertInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
  /** An object where the defined keys will be set on the `Alert` being updated. */
  patch: AlertPatch;
};

/** The output of our update `Alert` mutation. */
export type UpdateAlertPayload = {
  __typename?: 'UpdateAlertPayload';
  /** The `Alert` that was updated by this mutation. */
  alert?: Maybe<Alert>;
  /** An edge for our `Alert`. May be used by Relay 1. */
  alertEdge?: Maybe<AlertsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Alert` mutation. */
export type UpdateAlertPayloadAlertEdgeArgs = {
  orderBy?: InputMaybe<Array<AlertsOrderBy>>;
};

/** All input for the `updateItemByNodeId` mutation. */
export type UpdateItemByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Item` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Item` being updated. */
  patch: ItemPatch;
};

/** All input for the `updateItem` mutation. */
export type UpdateItemInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
  /** An object where the defined keys will be set on the `Item` being updated. */
  patch: ItemPatch;
};

/** The output of our update `Item` mutation. */
export type UpdateItemPayload = {
  __typename?: 'UpdateItemPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Item` that was updated by this mutation. */
  item?: Maybe<Item>;
  /** An edge for our `Item`. May be used by Relay 1. */
  itemEdge?: Maybe<ItemsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Item` mutation. */
export type UpdateItemPayloadItemEdgeArgs = {
  orderBy?: InputMaybe<Array<ItemsOrderBy>>;
};

/** All input for the `updateMarkerByNodeId` mutation. */
export type UpdateMarkerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Marker` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Marker` being updated. */
  patch: MarkerPatch;
};

/** All input for the `updateMarker` mutation. */
export type UpdateMarkerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
  /** An object where the defined keys will be set on the `Marker` being updated. */
  patch: MarkerPatch;
};

/** The output of our update `Marker` mutation. */
export type UpdateMarkerPayload = {
  __typename?: 'UpdateMarkerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Marker` that was updated by this mutation. */
  marker?: Maybe<Marker>;
  /** An edge for our `Marker`. May be used by Relay 1. */
  markerEdge?: Maybe<MarkersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Marker` mutation. */
export type UpdateMarkerPayloadMarkerEdgeArgs = {
  orderBy?: InputMaybe<Array<MarkersOrderBy>>;
};

/** All input for the `updateMessageByNodeId` mutation. */
export type UpdateMessageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Message` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Message` being updated. */
  patch: MessagePatch;
};

/** All input for the `updateMessage` mutation. */
export type UpdateMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
  /** An object where the defined keys will be set on the `Message` being updated. */
  patch: MessagePatch;
};

/** The output of our update `Message` mutation. */
export type UpdateMessagePayload = {
  __typename?: 'UpdateMessagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Message` that was updated by this mutation. */
  message?: Maybe<Message>;
  /** An edge for our `Message`. May be used by Relay 1. */
  messageEdge?: Maybe<MessagesEdge>;
  /** Reads a single `Player` that is related to this `Message`. */
  player?: Maybe<Player>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Player` that is related to this `Message`. */
  targetPlayer?: Maybe<Player>;
};


/** The output of our update `Message` mutation. */
export type UpdateMessagePayloadMessageEdgeArgs = {
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};

/** All input for the `updatePetByNodeId` mutation. */
export type UpdatePetByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Pet` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Pet` being updated. */
  patch: PetPatch;
};

/** All input for the `updatePetBySpriteIndex` mutation. */
export type UpdatePetBySpriteIndexInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Pet` being updated. */
  patch: PetPatch;
  spriteIndex: Scalars['Int']['input'];
};

/** All input for the `updatePet` mutation. */
export type UpdatePetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
  /** An object where the defined keys will be set on the `Pet` being updated. */
  patch: PetPatch;
};

/** The output of our update `Pet` mutation. */
export type UpdatePetPayload = {
  __typename?: 'UpdatePetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Pet` that was updated by this mutation. */
  pet?: Maybe<Pet>;
  /** An edge for our `Pet`. May be used by Relay 1. */
  petEdge?: Maybe<PetsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Pet` mutation. */
export type UpdatePetPayloadPetEdgeArgs = {
  orderBy?: InputMaybe<Array<PetsOrderBy>>;
};

/** All input for the `updatePlayerAlertByNodeId` mutation. */
export type UpdatePlayerAlertByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PlayerAlert` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `PlayerAlert` being updated. */
  patch: PlayerAlertPatch;
};

/** All input for the `updatePlayerAlert` mutation. */
export type UpdatePlayerAlertInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
  /** An object where the defined keys will be set on the `PlayerAlert` being updated. */
  patch: PlayerAlertPatch;
};

/** The output of our update `PlayerAlert` mutation. */
export type UpdatePlayerAlertPayload = {
  __typename?: 'UpdatePlayerAlertPayload';
  /** Reads a single `Alert` that is related to this `PlayerAlert`. */
  alert?: Maybe<Alert>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Player` that is related to this `PlayerAlert`. */
  player?: Maybe<Player>;
  /** The `PlayerAlert` that was updated by this mutation. */
  playerAlert?: Maybe<PlayerAlert>;
  /** An edge for our `PlayerAlert`. May be used by Relay 1. */
  playerAlertEdge?: Maybe<PlayerAlertsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `PlayerAlert` mutation. */
export type UpdatePlayerAlertPayloadPlayerAlertEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerAlertsOrderBy>>;
};

/** All input for the `updatePlayerByNodeId` mutation. */
export type UpdatePlayerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Player` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Player` being updated. */
  patch: PlayerPatch;
};

/** All input for the `updatePlayerByProviderId` mutation. */
export type UpdatePlayerByProviderIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Player` being updated. */
  patch: PlayerPatch;
  providerId: Scalars['String']['input'];
};

/** All input for the `updatePlayer` mutation. */
export type UpdatePlayerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
  /** An object where the defined keys will be set on the `Player` being updated. */
  patch: PlayerPatch;
};

/** All input for the `updatePlayerItemByNodeId` mutation. */
export type UpdatePlayerItemByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PlayerItem` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `PlayerItem` being updated. */
  patch: PlayerItemPatch;
};

/** All input for the `updatePlayerItem` mutation. */
export type UpdatePlayerItemInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
  /** An object where the defined keys will be set on the `PlayerItem` being updated. */
  patch: PlayerItemPatch;
};

/** The output of our update `PlayerItem` mutation. */
export type UpdatePlayerItemPayload = {
  __typename?: 'UpdatePlayerItemPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Item` that is related to this `PlayerItem`. */
  item?: Maybe<Item>;
  /** Reads a single `Player` that is related to this `PlayerItem`. */
  player?: Maybe<Player>;
  /** The `PlayerItem` that was updated by this mutation. */
  playerItem?: Maybe<PlayerItem>;
  /** An edge for our `PlayerItem`. May be used by Relay 1. */
  playerItemEdge?: Maybe<PlayerItemsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `PlayerItem` mutation. */
export type UpdatePlayerItemPayloadPlayerItemEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerItemsOrderBy>>;
};

/** All input for the `updatePlayerMarkerByNodeId` mutation. */
export type UpdatePlayerMarkerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PlayerMarker` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `PlayerMarker` being updated. */
  patch: PlayerMarkerPatch;
};

/** All input for the `updatePlayerMarker` mutation. */
export type UpdatePlayerMarkerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  markerId: Scalars['BigInt']['input'];
  /** An object where the defined keys will be set on the `PlayerMarker` being updated. */
  patch: PlayerMarkerPatch;
  playerId: Scalars['BigInt']['input'];
};

/** The output of our update `PlayerMarker` mutation. */
export type UpdatePlayerMarkerPayload = {
  __typename?: 'UpdatePlayerMarkerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Marker` that is related to this `PlayerMarker`. */
  marker?: Maybe<Marker>;
  /** Reads a single `Player` that is related to this `PlayerMarker`. */
  player?: Maybe<Player>;
  /** The `PlayerMarker` that was updated by this mutation. */
  playerMarker?: Maybe<PlayerMarker>;
  /** An edge for our `PlayerMarker`. May be used by Relay 1. */
  playerMarkerEdge?: Maybe<PlayerMarkersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `PlayerMarker` mutation. */
export type UpdatePlayerMarkerPayloadPlayerMarkerEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerMarkersOrderBy>>;
};

/** The output of our update `Player` mutation. */
export type UpdatePlayerPayload = {
  __typename?: 'UpdatePlayerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Player` that was updated by this mutation. */
  player?: Maybe<Player>;
  /** An edge for our `Player`. May be used by Relay 1. */
  playerEdge?: Maybe<PlayersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Player` mutation. */
export type UpdatePlayerPayloadPlayerEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayersOrderBy>>;
};

/** All input for the `updatePlayerPetByNodeId` mutation. */
export type UpdatePlayerPetByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PlayerPet` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `PlayerPet` being updated. */
  patch: PlayerPetPatch;
};

/** All input for the `updatePlayerPet` mutation. */
export type UpdatePlayerPetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `PlayerPet` being updated. */
  patch: PlayerPetPatch;
  petId: Scalars['BigInt']['input'];
  playerId: Scalars['BigInt']['input'];
};

/** The output of our update `PlayerPet` mutation. */
export type UpdatePlayerPetPayload = {
  __typename?: 'UpdatePlayerPetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Pet` that is related to this `PlayerPet`. */
  pet?: Maybe<Pet>;
  /** Reads a single `Player` that is related to this `PlayerPet`. */
  player?: Maybe<Player>;
  /** The `PlayerPet` that was updated by this mutation. */
  playerPet?: Maybe<PlayerPet>;
  /** An edge for our `PlayerPet`. May be used by Relay 1. */
  playerPetEdge?: Maybe<PlayerPetsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `PlayerPet` mutation. */
export type UpdatePlayerPetPayloadPlayerPetEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerPetsOrderBy>>;
};

/** All input for the `updatePlayersPrivateByNodeId` mutation. */
export type UpdatePlayersPrivateByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PlayersPrivate` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `PlayersPrivate` being updated. */
  patch: PlayersPrivatePatch;
};

/** All input for the `updatePlayersPrivate` mutation. */
export type UpdatePlayersPrivateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `PlayersPrivate` being updated. */
  patch: PlayersPrivatePatch;
  playerId: Scalars['BigInt']['input'];
};

/** The output of our update `PlayersPrivate` mutation. */
export type UpdatePlayersPrivatePayload = {
  __typename?: 'UpdatePlayersPrivatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Player` that is related to this `PlayersPrivate`. */
  player?: Maybe<Player>;
  /** The `PlayersPrivate` that was updated by this mutation. */
  playersPrivate?: Maybe<PlayersPrivate>;
  /** An edge for our `PlayersPrivate`. May be used by Relay 1. */
  playersPrivateEdge?: Maybe<PlayersPrivatesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `PlayersPrivate` mutation. */
export type UpdatePlayersPrivatePayloadPlayersPrivateEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayersPrivatesOrderBy>>;
};

/** All input for the `updateStatus` mutation. */
export type UpdateStatusInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  playerSecret?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['JSON']['input']>;
};

/** The output of our `updateStatus` mutation. */
export type UpdateStatusPayload = {
  __typename?: 'UpdateStatusPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  player?: Maybe<Player>;
  /** An edge for our `Player`. May be used by Relay 1. */
  playerEdge?: Maybe<PlayersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `updateStatus` mutation. */
export type UpdateStatusPayloadPlayerEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayersOrderBy>>;
};

/** All input for the `upsertPlayerItem` mutation. */
export type UpsertPlayerItemInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  props?: InputMaybe<Scalars['JSON']['input']>;
  targetItemId?: InputMaybe<Scalars['BigInt']['input']>;
};

/** The output of our `upsertPlayerItem` mutation. */
export type UpsertPlayerItemPayload = {
  __typename?: 'UpsertPlayerItemPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

export type AcknowledgeAlertMutationVariables = Exact<{
  playerAlertId: Scalars['BigInt']['input'];
  response?: InputMaybe<Scalars['String']['input']>;
}>;


export type AcknowledgeAlertMutation = { __typename?: 'Mutation', acknowledgeAlert?: { __typename?: 'AcknowledgeAlertPayload', playerAlert?: { __typename?: 'PlayerAlert', id: any, response?: string | null, acknowledgedAt?: any | null, alert?: { __typename?: 'Alert', id: any, title?: string | null, message?: string | null, options: any } | null } | null } | null };

export type ClaimDeskMutationVariables = Exact<{
  deskMarkerId: Scalars['BigInt']['input'];
}>;


export type ClaimDeskMutation = { __typename?: 'Mutation', claimDesk?: { __typename?: 'ClaimDeskPayload', clientMutationId?: string | null } | null };

export type CreateStreamMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateStreamMutation = { __typename?: 'Mutation', createStream?: { __typename?: 'CreateStreamPayload', stream?: { __typename?: 'Stream', id: any } | null } | null };

export type InsertMessageMutationVariables = Exact<{
  message: Scalars['String']['input'];
  targetPlayerId?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type InsertMessageMutation = { __typename?: 'Mutation', insertMessage?: { __typename?: 'InsertMessagePayload', clientMutationId?: string | null } | null };

export type PingMutationVariables = Exact<{ [key: string]: never; }>;


export type PingMutation = { __typename?: 'Mutation', ping?: { __typename?: 'PingPayload', clientMutationId?: string | null } | null };

export type ReleaseDeskMutationVariables = Exact<{ [key: string]: never; }>;


export type ReleaseDeskMutation = { __typename?: 'Mutation', releaseDesk?: { __typename?: 'ReleaseDeskPayload', clientMutationId?: string | null } | null };

export type UpdatePlayerMetaMutationVariables = Exact<{
  id: Scalars['BigInt']['input'];
  meta: Scalars['JSON']['input'];
}>;


export type UpdatePlayerMetaMutation = { __typename?: 'Mutation', updatePlayer?: { __typename?: 'UpdatePlayerPayload', player?: { __typename?: 'Player', nodeId: string, id: any, meta?: any | null } | null } | null };

export type UpdatePlayerPositionMutationVariables = Exact<{
  id: Scalars['BigInt']['input'];
  position: Scalars['JSON']['input'];
}>;


export type UpdatePlayerPositionMutation = { __typename?: 'Mutation', updatePlayer?: { __typename?: 'UpdatePlayerPayload', player?: { __typename?: 'Player', nodeId: string, id: any, position?: any | null } | null } | null };

export type UpdatePlayerPrivateMutationVariables = Exact<{
  playerId: Scalars['BigInt']['input'];
  aiPrompt: Scalars['String']['input'];
}>;


export type UpdatePlayerPrivateMutation = { __typename?: 'Mutation', updatePlayersPrivate?: { __typename?: 'UpdatePlayersPrivatePayload', playersPrivate?: { __typename?: 'PlayersPrivate', nodeId: string, aiPrompt?: string | null } | null } | null };

export type UpdatePlayerWalletMutationVariables = Exact<{
  id: Scalars['BigInt']['input'];
  wallets: Scalars['JSON']['input'];
}>;


export type UpdatePlayerWalletMutation = { __typename?: 'Mutation', updatePlayer?: { __typename?: 'UpdatePlayerPayload', player?: { __typename?: 'Player', nodeId: string, id: any, wallets?: any | null } | null } | null };

export type UpsertPlayerItemMutationVariables = Exact<{
  itemId: Scalars['BigInt']['input'];
  props?: InputMaybe<Scalars['JSON']['input']>;
}>;


export type UpsertPlayerItemMutation = { __typename?: 'Mutation', upsertPlayerItem?: { __typename?: 'UpsertPlayerItemPayload', clientMutationId?: string | null } | null };

export type GetPlayerItemFieldsFragment = { __typename?: 'PlayerItem', nodeId: string, id: any, itemId: any, playerId: any, props?: any | null, item?: { __typename?: 'Item', nodeId: string, id: any, itemKey: string, name: string, type?: string | null, description?: string | null, props?: any | null } | null };

export type GetPlayerMarkerFieldsFragment = { __typename?: 'PlayerMarker', nodeId: string, props?: any | null, marker?: { __typename?: 'Marker', nodeId: string, id: any, type?: string | null, props?: any | null } | null };

export type GetPlayerPrivateFieldsFragment = { __typename?: 'PlayersPrivate', nodeId: string, aiPrompt?: string | null };

export type GetPlayerPetsFragment = { __typename?: 'PlayerPet', nodeId: string, name?: string | null, petId: any, pet?: { __typename?: 'Pet', spriteIndex: number } | null };

export type GetCurrentPlayerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentPlayerQuery = { __typename?: 'Query', currentPlayer?: { __typename?: 'Player', nodeId: string, id: any, username: string, meta?: any | null, position?: any | null, currentStreamKey?: string | null, apiSecret?: string | null, playerItems: { __typename?: 'PlayerItemsConnection', nodes: Array<{ __typename?: 'PlayerItem', nodeId: string, id: any, itemId: any, playerId: any, props?: any | null, item?: { __typename?: 'Item', nodeId: string, id: any, itemKey: string, name: string, type?: string | null, description?: string | null, props?: any | null } | null }> }, playerMarkers: { __typename?: 'PlayerMarkersConnection', nodes: Array<{ __typename?: 'PlayerMarker', nodeId: string, props?: any | null, marker?: { __typename?: 'Marker', nodeId: string, id: any, type?: string | null, props?: any | null } | null }> }, playersPrivate?: { __typename?: 'PlayersPrivate', nodeId: string, aiPrompt?: string | null } | null, playerPets: { __typename?: 'PlayerPetsConnection', nodes: Array<{ __typename?: 'PlayerPet', nodeId: string, name?: string | null, petId: any, pet?: { __typename?: 'Pet', spriteIndex: number } | null }> }, stream?: { __typename?: 'Stream', viewerUrl?: string | null, rtmpsUrl?: string | null, providerId?: string | null, status?: string | null } | null } | null };

export type GetItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetItemsQuery = { __typename?: 'Query', items?: { __typename?: 'ItemsConnection', nodes: Array<{ __typename?: 'Item', nodeId: string, id: any, itemKey: string, name: string, type?: string | null, description?: string | null, props?: any | null }> } | null };

export type PlayerFieldsFragment = { __typename?: 'Player', nodeId: string, id: any, username: string, meta?: any | null, isOnline?: string | null };

export type GetMarkersQueryVariables = Exact<{
  markerType: Scalars['String']['input'];
}>;


export type GetMarkersQuery = { __typename?: 'Query', markers?: { __typename?: 'MarkersConnection', nodes: Array<{ __typename?: 'Marker', nodeId: string, id: any, type?: string | null, props?: any | null, playerMarkers: { __typename?: 'PlayerMarkersConnection', nodes: Array<{ __typename?: 'PlayerMarker', player?: { __typename?: 'Player', nodeId: string, id: any, username: string, meta?: any | null, isOnline?: string | null } | null }> } }> } | null };

export type GetPrivateMessagesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPrivateMessagesQuery = { __typename?: 'Query', messages?: { __typename?: 'MessagesConnection', nodes: Array<{ __typename?: 'Message', message: string, id: any, targetPlayerId?: any | null, player?: { __typename?: 'Player', id: any, username: string } | null }> } | null };

export type GetUnacknowledgedAlertsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnacknowledgedAlertsQuery = { __typename?: 'Query', playerAlerts?: { __typename?: 'PlayerAlertsConnection', nodes: Array<{ __typename?: 'PlayerAlert', id: any, nodeId: string, alertId: any, alert?: { __typename?: 'Alert', id: any, title?: string | null, message?: string | null, options: any, meta?: any | null } | null }> } | null };

export type MessageFieldsFragment = { __typename?: 'Message', nodeId: string, id: any, message: string, createdAt?: any | null, meta?: any | null, player?: { __typename?: 'Player', id: any, username: string } | null };

export type GlobalChatUpdatesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GlobalChatUpdatesSubscription = { __typename?: 'Subscription', listen: { __typename?: 'ListenPayload', relatedNode?: { __typename?: 'Alert' } | { __typename?: 'Feed' } | { __typename?: 'FeedItem' } | { __typename?: 'Item' } | { __typename?: 'Marker' } | { __typename?: 'Message', nodeId: string, id: any, message: string, createdAt?: any | null, meta?: any | null, player?: { __typename?: 'Player', id: any, username: string } | null } | { __typename?: 'Pet' } | { __typename?: 'Player' } | { __typename?: 'PlayerAlert' } | { __typename?: 'PlayerItem' } | { __typename?: 'PlayerMarker' } | { __typename?: 'PlayerPet' } | { __typename?: 'PlayerSubscription' } | { __typename?: 'PlayersPrivate' } | { __typename?: 'Query' } | { __typename?: 'Stream' } | null } };

export type MarkerUpdatesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MarkerUpdatesSubscription = { __typename?: 'Subscription', listen: { __typename?: 'ListenPayload', relatedNode?: { __typename?: 'Alert' } | { __typename?: 'Feed' } | { __typename?: 'FeedItem' } | { __typename?: 'Item' } | { __typename?: 'Marker', id: any, type?: string | null, props?: any | null, playerMarkers: { __typename?: 'PlayerMarkersConnection', nodes: Array<{ __typename?: 'PlayerMarker', player?: { __typename?: 'Player', nodeId: string, id: any, username: string, meta?: any | null, isOnline?: string | null } | null }> } } | { __typename?: 'Message' } | { __typename?: 'Pet' } | { __typename?: 'Player' } | { __typename?: 'PlayerAlert' } | { __typename?: 'PlayerItem' } | { __typename?: 'PlayerMarker' } | { __typename?: 'PlayerPet' } | { __typename?: 'PlayerSubscription' } | { __typename?: 'PlayersPrivate' } | { __typename?: 'Query' } | { __typename?: 'Stream' } | null } };

export type PlayerItemFieldsFragment = { __typename?: 'PlayerItem', nodeId: string, id: any, props?: any | null, item?: { __typename?: 'Item', nodeId: string, id: any, itemKey: string, name: string, type?: string | null, description?: string | null, props?: any | null } | null };

export type MarkerItemFieldsFragment = { __typename?: 'Marker', nodeId: string, id: any, type?: string | null, props?: any | null };

export type PlayerUpdatesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PlayerUpdatesSubscription = { __typename?: 'Subscription', listen: { __typename?: 'ListenPayload', relatedNode?: { __typename?: 'Alert' } | { __typename?: 'Feed' } | { __typename?: 'FeedItem' } | { __typename?: 'Item' } | { __typename?: 'Marker' } | { __typename?: 'Message' } | { __typename?: 'Pet' } | { __typename?: 'Player', nodeId: string, id: any, position?: any | null, username: string, meta?: any | null, isOnline?: string | null, wallets?: any | null, playerPets: { __typename?: 'PlayerPetsConnection', nodes: Array<{ __typename?: 'PlayerPet', nodeId: string, name?: string | null, petId: any, pet?: { __typename?: 'Pet', spriteIndex: number } | null }> }, playerItems: { __typename?: 'PlayerItemsConnection', nodes: Array<{ __typename?: 'PlayerItem', nodeId: string, id: any, props?: any | null, item?: { __typename?: 'Item', nodeId: string, id: any, itemKey: string, name: string, type?: string | null, description?: string | null, props?: any | null } | null }> }, playerMarkers: { __typename?: 'PlayerMarkersConnection', nodes: Array<{ __typename?: 'PlayerMarker', marker?: { __typename?: 'Marker', nodeId: string, id: any, type?: string | null, props?: any | null } | null }> }, stream?: { __typename?: 'Stream', viewerUrl?: string | null, rtmpsUrl?: string | null, providerId?: string | null, status?: string | null } | null } | { __typename?: 'PlayerAlert' } | { __typename?: 'PlayerItem' } | { __typename?: 'PlayerMarker' } | { __typename?: 'PlayerPet' } | { __typename?: 'PlayerSubscription' } | { __typename?: 'PlayersPrivate' } | { __typename?: 'Query' } | { __typename?: 'Stream' } | null } };

export const GetPlayerItemFieldsFragmentDoc = gql`
    fragment GetPlayerItemFields on PlayerItem {
  nodeId
  id
  itemId
  playerId
  props
  item {
    nodeId
    id
    itemKey
    name
    type
    description
    props
  }
}
    `;
export const GetPlayerMarkerFieldsFragmentDoc = gql`
    fragment GetPlayerMarkerFields on PlayerMarker {
  nodeId
  props
  marker {
    nodeId
    id
    type
    props
  }
}
    `;
export const GetPlayerPrivateFieldsFragmentDoc = gql`
    fragment GetPlayerPrivateFields on PlayersPrivate {
  nodeId
  aiPrompt
}
    `;
export const GetPlayerPetsFragmentDoc = gql`
    fragment GetPlayerPets on PlayerPet {
  nodeId
  name
  petId
  pet {
    spriteIndex
  }
}
    `;
export const PlayerFieldsFragmentDoc = gql`
    fragment PlayerFields on Player {
  nodeId
  id
  username
  meta
  isOnline
}
    `;
export const MessageFieldsFragmentDoc = gql`
    fragment MessageFields on Message {
  nodeId
  id
  message
  createdAt
  meta
  player {
    id
    username
  }
}
    `;
export const PlayerItemFieldsFragmentDoc = gql`
    fragment PlayerItemFields on PlayerItem {
  nodeId
  id
  props
  item {
    nodeId
    id
    itemKey
    name
    type
    description
    props
  }
}
    `;
export const MarkerItemFieldsFragmentDoc = gql`
    fragment MarkerItemFields on Marker {
  nodeId
  id
  type
  props
}
    `;
export const AcknowledgeAlertDocument = gql`
    mutation AcknowledgeAlert($playerAlertId: BigInt!, $response: String) {
  acknowledgeAlert(input: {playerAlertId: $playerAlertId, response: $response}) {
    playerAlert {
      id
      response
      acknowledgedAt
      alert {
        id
        title
        message
        options
      }
    }
  }
}
    `;
export type AcknowledgeAlertMutationFn = Apollo.MutationFunction<AcknowledgeAlertMutation, AcknowledgeAlertMutationVariables>;

/**
 * __useAcknowledgeAlertMutation__
 *
 * To run a mutation, you first call `useAcknowledgeAlertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcknowledgeAlertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acknowledgeAlertMutation, { data, loading, error }] = useAcknowledgeAlertMutation({
 *   variables: {
 *      playerAlertId: // value for 'playerAlertId'
 *      response: // value for 'response'
 *   },
 * });
 */
export function useAcknowledgeAlertMutation(baseOptions?: Apollo.MutationHookOptions<AcknowledgeAlertMutation, AcknowledgeAlertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcknowledgeAlertMutation, AcknowledgeAlertMutationVariables>(AcknowledgeAlertDocument, options);
      }
export type AcknowledgeAlertMutationHookResult = ReturnType<typeof useAcknowledgeAlertMutation>;
export type AcknowledgeAlertMutationResult = Apollo.MutationResult<AcknowledgeAlertMutation>;
export type AcknowledgeAlertMutationOptions = Apollo.BaseMutationOptions<AcknowledgeAlertMutation, AcknowledgeAlertMutationVariables>;
export const ClaimDeskDocument = gql`
    mutation ClaimDesk($deskMarkerId: BigInt!) {
  claimDesk(input: {deskMarkerId: $deskMarkerId}) {
    clientMutationId
  }
}
    `;
export type ClaimDeskMutationFn = Apollo.MutationFunction<ClaimDeskMutation, ClaimDeskMutationVariables>;

/**
 * __useClaimDeskMutation__
 *
 * To run a mutation, you first call `useClaimDeskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClaimDeskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [claimDeskMutation, { data, loading, error }] = useClaimDeskMutation({
 *   variables: {
 *      deskMarkerId: // value for 'deskMarkerId'
 *   },
 * });
 */
export function useClaimDeskMutation(baseOptions?: Apollo.MutationHookOptions<ClaimDeskMutation, ClaimDeskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClaimDeskMutation, ClaimDeskMutationVariables>(ClaimDeskDocument, options);
      }
export type ClaimDeskMutationHookResult = ReturnType<typeof useClaimDeskMutation>;
export type ClaimDeskMutationResult = Apollo.MutationResult<ClaimDeskMutation>;
export type ClaimDeskMutationOptions = Apollo.BaseMutationOptions<ClaimDeskMutation, ClaimDeskMutationVariables>;
export const CreateStreamDocument = gql`
    mutation CreateStream {
  createStream(input: {}) {
    stream {
      id
    }
  }
}
    `;
export type CreateStreamMutationFn = Apollo.MutationFunction<CreateStreamMutation, CreateStreamMutationVariables>;

/**
 * __useCreateStreamMutation__
 *
 * To run a mutation, you first call `useCreateStreamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStreamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStreamMutation, { data, loading, error }] = useCreateStreamMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateStreamMutation(baseOptions?: Apollo.MutationHookOptions<CreateStreamMutation, CreateStreamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStreamMutation, CreateStreamMutationVariables>(CreateStreamDocument, options);
      }
export type CreateStreamMutationHookResult = ReturnType<typeof useCreateStreamMutation>;
export type CreateStreamMutationResult = Apollo.MutationResult<CreateStreamMutation>;
export type CreateStreamMutationOptions = Apollo.BaseMutationOptions<CreateStreamMutation, CreateStreamMutationVariables>;
export const InsertMessageDocument = gql`
    mutation InsertMessage($message: String!, $targetPlayerId: BigInt) {
  insertMessage(input: {message: $message, targetPlayerId: $targetPlayerId}) {
    clientMutationId
  }
}
    `;
export type InsertMessageMutationFn = Apollo.MutationFunction<InsertMessageMutation, InsertMessageMutationVariables>;

/**
 * __useInsertMessageMutation__
 *
 * To run a mutation, you first call `useInsertMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertMessageMutation, { data, loading, error }] = useInsertMessageMutation({
 *   variables: {
 *      message: // value for 'message'
 *      targetPlayerId: // value for 'targetPlayerId'
 *   },
 * });
 */
export function useInsertMessageMutation(baseOptions?: Apollo.MutationHookOptions<InsertMessageMutation, InsertMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertMessageMutation, InsertMessageMutationVariables>(InsertMessageDocument, options);
      }
export type InsertMessageMutationHookResult = ReturnType<typeof useInsertMessageMutation>;
export type InsertMessageMutationResult = Apollo.MutationResult<InsertMessageMutation>;
export type InsertMessageMutationOptions = Apollo.BaseMutationOptions<InsertMessageMutation, InsertMessageMutationVariables>;
export const PingDocument = gql`
    mutation Ping {
  ping(input: {}) {
    clientMutationId
  }
}
    `;
export type PingMutationFn = Apollo.MutationFunction<PingMutation, PingMutationVariables>;

/**
 * __usePingMutation__
 *
 * To run a mutation, you first call `usePingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pingMutation, { data, loading, error }] = usePingMutation({
 *   variables: {
 *   },
 * });
 */
export function usePingMutation(baseOptions?: Apollo.MutationHookOptions<PingMutation, PingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PingMutation, PingMutationVariables>(PingDocument, options);
      }
export type PingMutationHookResult = ReturnType<typeof usePingMutation>;
export type PingMutationResult = Apollo.MutationResult<PingMutation>;
export type PingMutationOptions = Apollo.BaseMutationOptions<PingMutation, PingMutationVariables>;
export const ReleaseDeskDocument = gql`
    mutation ReleaseDesk {
  releaseDesk(input: {}) {
    clientMutationId
  }
}
    `;
export type ReleaseDeskMutationFn = Apollo.MutationFunction<ReleaseDeskMutation, ReleaseDeskMutationVariables>;

/**
 * __useReleaseDeskMutation__
 *
 * To run a mutation, you first call `useReleaseDeskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReleaseDeskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [releaseDeskMutation, { data, loading, error }] = useReleaseDeskMutation({
 *   variables: {
 *   },
 * });
 */
export function useReleaseDeskMutation(baseOptions?: Apollo.MutationHookOptions<ReleaseDeskMutation, ReleaseDeskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReleaseDeskMutation, ReleaseDeskMutationVariables>(ReleaseDeskDocument, options);
      }
export type ReleaseDeskMutationHookResult = ReturnType<typeof useReleaseDeskMutation>;
export type ReleaseDeskMutationResult = Apollo.MutationResult<ReleaseDeskMutation>;
export type ReleaseDeskMutationOptions = Apollo.BaseMutationOptions<ReleaseDeskMutation, ReleaseDeskMutationVariables>;
export const UpdatePlayerMetaDocument = gql`
    mutation UpdatePlayerMeta($id: BigInt!, $meta: JSON!) {
  updatePlayer(input: {patch: {meta: $meta}, id: $id}) {
    player {
      nodeId
      id
      meta
    }
  }
}
    `;
export type UpdatePlayerMetaMutationFn = Apollo.MutationFunction<UpdatePlayerMetaMutation, UpdatePlayerMetaMutationVariables>;

/**
 * __useUpdatePlayerMetaMutation__
 *
 * To run a mutation, you first call `useUpdatePlayerMetaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlayerMetaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlayerMetaMutation, { data, loading, error }] = useUpdatePlayerMetaMutation({
 *   variables: {
 *      id: // value for 'id'
 *      meta: // value for 'meta'
 *   },
 * });
 */
export function useUpdatePlayerMetaMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlayerMetaMutation, UpdatePlayerMetaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlayerMetaMutation, UpdatePlayerMetaMutationVariables>(UpdatePlayerMetaDocument, options);
      }
export type UpdatePlayerMetaMutationHookResult = ReturnType<typeof useUpdatePlayerMetaMutation>;
export type UpdatePlayerMetaMutationResult = Apollo.MutationResult<UpdatePlayerMetaMutation>;
export type UpdatePlayerMetaMutationOptions = Apollo.BaseMutationOptions<UpdatePlayerMetaMutation, UpdatePlayerMetaMutationVariables>;
export const UpdatePlayerPositionDocument = gql`
    mutation UpdatePlayerPosition($id: BigInt!, $position: JSON!) {
  updatePlayer(input: {patch: {position: $position}, id: $id}) {
    player {
      nodeId
      id
      position
    }
  }
}
    `;
export type UpdatePlayerPositionMutationFn = Apollo.MutationFunction<UpdatePlayerPositionMutation, UpdatePlayerPositionMutationVariables>;

/**
 * __useUpdatePlayerPositionMutation__
 *
 * To run a mutation, you first call `useUpdatePlayerPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlayerPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlayerPositionMutation, { data, loading, error }] = useUpdatePlayerPositionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useUpdatePlayerPositionMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlayerPositionMutation, UpdatePlayerPositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlayerPositionMutation, UpdatePlayerPositionMutationVariables>(UpdatePlayerPositionDocument, options);
      }
export type UpdatePlayerPositionMutationHookResult = ReturnType<typeof useUpdatePlayerPositionMutation>;
export type UpdatePlayerPositionMutationResult = Apollo.MutationResult<UpdatePlayerPositionMutation>;
export type UpdatePlayerPositionMutationOptions = Apollo.BaseMutationOptions<UpdatePlayerPositionMutation, UpdatePlayerPositionMutationVariables>;
export const UpdatePlayerPrivateDocument = gql`
    mutation UpdatePlayerPrivate($playerId: BigInt!, $aiPrompt: String!) {
  updatePlayersPrivate(input: {playerId: $playerId, patch: {aiPrompt: $aiPrompt}}) {
    playersPrivate {
      nodeId
      aiPrompt
    }
  }
}
    `;
export type UpdatePlayerPrivateMutationFn = Apollo.MutationFunction<UpdatePlayerPrivateMutation, UpdatePlayerPrivateMutationVariables>;

/**
 * __useUpdatePlayerPrivateMutation__
 *
 * To run a mutation, you first call `useUpdatePlayerPrivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlayerPrivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlayerPrivateMutation, { data, loading, error }] = useUpdatePlayerPrivateMutation({
 *   variables: {
 *      playerId: // value for 'playerId'
 *      aiPrompt: // value for 'aiPrompt'
 *   },
 * });
 */
export function useUpdatePlayerPrivateMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlayerPrivateMutation, UpdatePlayerPrivateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlayerPrivateMutation, UpdatePlayerPrivateMutationVariables>(UpdatePlayerPrivateDocument, options);
      }
export type UpdatePlayerPrivateMutationHookResult = ReturnType<typeof useUpdatePlayerPrivateMutation>;
export type UpdatePlayerPrivateMutationResult = Apollo.MutationResult<UpdatePlayerPrivateMutation>;
export type UpdatePlayerPrivateMutationOptions = Apollo.BaseMutationOptions<UpdatePlayerPrivateMutation, UpdatePlayerPrivateMutationVariables>;
export const UpdatePlayerWalletDocument = gql`
    mutation UpdatePlayerWallet($id: BigInt!, $wallets: JSON!) {
  updatePlayer(input: {patch: {wallets: $wallets}, id: $id}) {
    player {
      nodeId
      id
      wallets
    }
  }
}
    `;
export type UpdatePlayerWalletMutationFn = Apollo.MutationFunction<UpdatePlayerWalletMutation, UpdatePlayerWalletMutationVariables>;

/**
 * __useUpdatePlayerWalletMutation__
 *
 * To run a mutation, you first call `useUpdatePlayerWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlayerWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlayerWalletMutation, { data, loading, error }] = useUpdatePlayerWalletMutation({
 *   variables: {
 *      id: // value for 'id'
 *      wallets: // value for 'wallets'
 *   },
 * });
 */
export function useUpdatePlayerWalletMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlayerWalletMutation, UpdatePlayerWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlayerWalletMutation, UpdatePlayerWalletMutationVariables>(UpdatePlayerWalletDocument, options);
      }
export type UpdatePlayerWalletMutationHookResult = ReturnType<typeof useUpdatePlayerWalletMutation>;
export type UpdatePlayerWalletMutationResult = Apollo.MutationResult<UpdatePlayerWalletMutation>;
export type UpdatePlayerWalletMutationOptions = Apollo.BaseMutationOptions<UpdatePlayerWalletMutation, UpdatePlayerWalletMutationVariables>;
export const UpsertPlayerItemDocument = gql`
    mutation UpsertPlayerItem($itemId: BigInt!, $props: JSON = "{}") {
  upsertPlayerItem(input: {targetItemId: $itemId, props: $props}) {
    clientMutationId
  }
}
    `;
export type UpsertPlayerItemMutationFn = Apollo.MutationFunction<UpsertPlayerItemMutation, UpsertPlayerItemMutationVariables>;

/**
 * __useUpsertPlayerItemMutation__
 *
 * To run a mutation, you first call `useUpsertPlayerItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertPlayerItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertPlayerItemMutation, { data, loading, error }] = useUpsertPlayerItemMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      props: // value for 'props'
 *   },
 * });
 */
export function useUpsertPlayerItemMutation(baseOptions?: Apollo.MutationHookOptions<UpsertPlayerItemMutation, UpsertPlayerItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertPlayerItemMutation, UpsertPlayerItemMutationVariables>(UpsertPlayerItemDocument, options);
      }
export type UpsertPlayerItemMutationHookResult = ReturnType<typeof useUpsertPlayerItemMutation>;
export type UpsertPlayerItemMutationResult = Apollo.MutationResult<UpsertPlayerItemMutation>;
export type UpsertPlayerItemMutationOptions = Apollo.BaseMutationOptions<UpsertPlayerItemMutation, UpsertPlayerItemMutationVariables>;
export const GetCurrentPlayerDocument = gql`
    query GetCurrentPlayer {
  currentPlayer {
    nodeId
    id
    username
    meta
    position
    currentStreamKey
    apiSecret
    playerItems {
      nodes {
        ...GetPlayerItemFields
      }
    }
    playerMarkers {
      nodes {
        ...GetPlayerMarkerFields
      }
    }
    playersPrivate {
      ...GetPlayerPrivateFields
    }
    playerPets {
      nodes {
        ...GetPlayerPets
      }
    }
    stream {
      viewerUrl
      rtmpsUrl
      providerId
      status
    }
  }
}
    ${GetPlayerItemFieldsFragmentDoc}
${GetPlayerMarkerFieldsFragmentDoc}
${GetPlayerPrivateFieldsFragmentDoc}
${GetPlayerPetsFragmentDoc}`;

/**
 * __useGetCurrentPlayerQuery__
 *
 * To run a query within a React component, call `useGetCurrentPlayerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentPlayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentPlayerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentPlayerQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentPlayerQuery, GetCurrentPlayerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentPlayerQuery, GetCurrentPlayerQueryVariables>(GetCurrentPlayerDocument, options);
      }
export function useGetCurrentPlayerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentPlayerQuery, GetCurrentPlayerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentPlayerQuery, GetCurrentPlayerQueryVariables>(GetCurrentPlayerDocument, options);
        }
export function useGetCurrentPlayerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentPlayerQuery, GetCurrentPlayerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentPlayerQuery, GetCurrentPlayerQueryVariables>(GetCurrentPlayerDocument, options);
        }
export type GetCurrentPlayerQueryHookResult = ReturnType<typeof useGetCurrentPlayerQuery>;
export type GetCurrentPlayerLazyQueryHookResult = ReturnType<typeof useGetCurrentPlayerLazyQuery>;
export type GetCurrentPlayerSuspenseQueryHookResult = ReturnType<typeof useGetCurrentPlayerSuspenseQuery>;
export type GetCurrentPlayerQueryResult = Apollo.QueryResult<GetCurrentPlayerQuery, GetCurrentPlayerQueryVariables>;
export const GetItemsDocument = gql`
    query GetItems {
  items {
    nodes {
      nodeId
      id
      itemKey
      name
      type
      description
      props
    }
  }
}
    `;

/**
 * __useGetItemsQuery__
 *
 * To run a query within a React component, call `useGetItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetItemsQuery(baseOptions?: Apollo.QueryHookOptions<GetItemsQuery, GetItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemsQuery, GetItemsQueryVariables>(GetItemsDocument, options);
      }
export function useGetItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemsQuery, GetItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemsQuery, GetItemsQueryVariables>(GetItemsDocument, options);
        }
export function useGetItemsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetItemsQuery, GetItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetItemsQuery, GetItemsQueryVariables>(GetItemsDocument, options);
        }
export type GetItemsQueryHookResult = ReturnType<typeof useGetItemsQuery>;
export type GetItemsLazyQueryHookResult = ReturnType<typeof useGetItemsLazyQuery>;
export type GetItemsSuspenseQueryHookResult = ReturnType<typeof useGetItemsSuspenseQuery>;
export type GetItemsQueryResult = Apollo.QueryResult<GetItemsQuery, GetItemsQueryVariables>;
export const GetMarkersDocument = gql`
    query GetMarkers($markerType: String!) {
  markers(filter: {type: {equalTo: $markerType}}) {
    nodes {
      nodeId
      id
      type
      props
      playerMarkers {
        nodes {
          player {
            ...PlayerFields
          }
        }
      }
    }
  }
}
    ${PlayerFieldsFragmentDoc}`;

/**
 * __useGetMarkersQuery__
 *
 * To run a query within a React component, call `useGetMarkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMarkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMarkersQuery({
 *   variables: {
 *      markerType: // value for 'markerType'
 *   },
 * });
 */
export function useGetMarkersQuery(baseOptions: Apollo.QueryHookOptions<GetMarkersQuery, GetMarkersQueryVariables> & ({ variables: GetMarkersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMarkersQuery, GetMarkersQueryVariables>(GetMarkersDocument, options);
      }
export function useGetMarkersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMarkersQuery, GetMarkersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMarkersQuery, GetMarkersQueryVariables>(GetMarkersDocument, options);
        }
export function useGetMarkersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMarkersQuery, GetMarkersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMarkersQuery, GetMarkersQueryVariables>(GetMarkersDocument, options);
        }
export type GetMarkersQueryHookResult = ReturnType<typeof useGetMarkersQuery>;
export type GetMarkersLazyQueryHookResult = ReturnType<typeof useGetMarkersLazyQuery>;
export type GetMarkersSuspenseQueryHookResult = ReturnType<typeof useGetMarkersSuspenseQuery>;
export type GetMarkersQueryResult = Apollo.QueryResult<GetMarkersQuery, GetMarkersQueryVariables>;
export const GetPrivateMessagesDocument = gql`
    query GetPrivateMessages($limit: Int = 50) {
  messages(
    orderBy: CREATED_AT_ASC
    last: $limit
    filter: {targetPlayerId: {isNull: false}}
  ) {
    nodes {
      message
      id
      targetPlayerId
      player {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useGetPrivateMessagesQuery__
 *
 * To run a query within a React component, call `useGetPrivateMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPrivateMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPrivateMessagesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPrivateMessagesQuery(baseOptions?: Apollo.QueryHookOptions<GetPrivateMessagesQuery, GetPrivateMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPrivateMessagesQuery, GetPrivateMessagesQueryVariables>(GetPrivateMessagesDocument, options);
      }
export function useGetPrivateMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrivateMessagesQuery, GetPrivateMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPrivateMessagesQuery, GetPrivateMessagesQueryVariables>(GetPrivateMessagesDocument, options);
        }
export function useGetPrivateMessagesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPrivateMessagesQuery, GetPrivateMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPrivateMessagesQuery, GetPrivateMessagesQueryVariables>(GetPrivateMessagesDocument, options);
        }
export type GetPrivateMessagesQueryHookResult = ReturnType<typeof useGetPrivateMessagesQuery>;
export type GetPrivateMessagesLazyQueryHookResult = ReturnType<typeof useGetPrivateMessagesLazyQuery>;
export type GetPrivateMessagesSuspenseQueryHookResult = ReturnType<typeof useGetPrivateMessagesSuspenseQuery>;
export type GetPrivateMessagesQueryResult = Apollo.QueryResult<GetPrivateMessagesQuery, GetPrivateMessagesQueryVariables>;
export const GetUnacknowledgedAlertsDocument = gql`
    query GetUnacknowledgedAlerts {
  playerAlerts(condition: {acknowledgedAt: null}) {
    nodes {
      id
      nodeId
      alertId
      alert {
        id
        title
        message
        options
        meta
      }
    }
  }
}
    `;

/**
 * __useGetUnacknowledgedAlertsQuery__
 *
 * To run a query within a React component, call `useGetUnacknowledgedAlertsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnacknowledgedAlertsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnacknowledgedAlertsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnacknowledgedAlertsQuery(baseOptions?: Apollo.QueryHookOptions<GetUnacknowledgedAlertsQuery, GetUnacknowledgedAlertsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnacknowledgedAlertsQuery, GetUnacknowledgedAlertsQueryVariables>(GetUnacknowledgedAlertsDocument, options);
      }
export function useGetUnacknowledgedAlertsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnacknowledgedAlertsQuery, GetUnacknowledgedAlertsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnacknowledgedAlertsQuery, GetUnacknowledgedAlertsQueryVariables>(GetUnacknowledgedAlertsDocument, options);
        }
export function useGetUnacknowledgedAlertsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUnacknowledgedAlertsQuery, GetUnacknowledgedAlertsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUnacknowledgedAlertsQuery, GetUnacknowledgedAlertsQueryVariables>(GetUnacknowledgedAlertsDocument, options);
        }
export type GetUnacknowledgedAlertsQueryHookResult = ReturnType<typeof useGetUnacknowledgedAlertsQuery>;
export type GetUnacknowledgedAlertsLazyQueryHookResult = ReturnType<typeof useGetUnacknowledgedAlertsLazyQuery>;
export type GetUnacknowledgedAlertsSuspenseQueryHookResult = ReturnType<typeof useGetUnacknowledgedAlertsSuspenseQuery>;
export type GetUnacknowledgedAlertsQueryResult = Apollo.QueryResult<GetUnacknowledgedAlertsQuery, GetUnacknowledgedAlertsQueryVariables>;
export const GlobalChatUpdatesDocument = gql`
    subscription GlobalChatUpdates {
  listen(topic: "global_message_received") {
    relatedNode {
      ... on Message {
        ...MessageFields
      }
    }
  }
}
    ${MessageFieldsFragmentDoc}`;

/**
 * __useGlobalChatUpdatesSubscription__
 *
 * To run a query within a React component, call `useGlobalChatUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGlobalChatUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalChatUpdatesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGlobalChatUpdatesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GlobalChatUpdatesSubscription, GlobalChatUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GlobalChatUpdatesSubscription, GlobalChatUpdatesSubscriptionVariables>(GlobalChatUpdatesDocument, options);
      }
export type GlobalChatUpdatesSubscriptionHookResult = ReturnType<typeof useGlobalChatUpdatesSubscription>;
export type GlobalChatUpdatesSubscriptionResult = Apollo.SubscriptionResult<GlobalChatUpdatesSubscription>;
export const MarkerUpdatesDocument = gql`
    subscription MarkerUpdates {
  listen(topic: "marker_updated") {
    relatedNode {
      ... on Marker {
        id
        type
        props
        playerMarkers {
          nodes {
            player {
              ...PlayerFields
            }
          }
        }
      }
    }
  }
}
    ${PlayerFieldsFragmentDoc}`;

/**
 * __useMarkerUpdatesSubscription__
 *
 * To run a query within a React component, call `useMarkerUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMarkerUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarkerUpdatesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMarkerUpdatesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MarkerUpdatesSubscription, MarkerUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MarkerUpdatesSubscription, MarkerUpdatesSubscriptionVariables>(MarkerUpdatesDocument, options);
      }
export type MarkerUpdatesSubscriptionHookResult = ReturnType<typeof useMarkerUpdatesSubscription>;
export type MarkerUpdatesSubscriptionResult = Apollo.SubscriptionResult<MarkerUpdatesSubscription>;
export const PlayerUpdatesDocument = gql`
    subscription PlayerUpdates {
  listen(topic: "player_updated") {
    relatedNode {
      ... on Player {
        nodeId
        id
        position
        username
        meta
        isOnline
        playerPets {
          nodes {
            ...GetPlayerPets
          }
        }
        playerItems {
          nodes {
            ...PlayerItemFields
          }
        }
        playerMarkers {
          nodes {
            marker {
              ...MarkerItemFields
            }
          }
        }
        stream {
          viewerUrl
          rtmpsUrl
          providerId
          status
        }
        wallets
      }
    }
  }
}
    ${GetPlayerPetsFragmentDoc}
${PlayerItemFieldsFragmentDoc}
${MarkerItemFieldsFragmentDoc}`;

/**
 * __usePlayerUpdatesSubscription__
 *
 * To run a query within a React component, call `usePlayerUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePlayerUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerUpdatesSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePlayerUpdatesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PlayerUpdatesSubscription, PlayerUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PlayerUpdatesSubscription, PlayerUpdatesSubscriptionVariables>(PlayerUpdatesDocument, options);
      }
export type PlayerUpdatesSubscriptionHookResult = ReturnType<typeof usePlayerUpdatesSubscription>;
export type PlayerUpdatesSubscriptionResult = Apollo.SubscriptionResult<PlayerUpdatesSubscription>;