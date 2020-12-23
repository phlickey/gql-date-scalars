import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent & { args?: { [key: string]: unknown } },
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult & {args?: TArgs}> | TResult & {args?: TArgs}

export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
export type DeepPartial<T> = {
 [P in keyof T]?: T[P] extends Array<infer U>
 ? Array<DeepPartial<U>>
 : T[P] extends ReadonlyArray<infer U>
 ? ReadonlyArray<DeepPartial<U>>
 : DeepPartial<T[P]>
 };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
  Time: Date;
  DateTime: Date;
};




export type Query = {
  __typename?: 'Query';
  aWeekAgo: Scalars['Date'];
  christmasDay: Scalars['Date'];
  info?: Maybe<Scalars['String']>;
  lunchTime: Scalars['Time'];
  now: Scalars['DateTime'];
  sixMinutesForward: Scalars['Time'];
};


export type QueryAWeekAgoArgs = {
  input: Scalars['Date'];
};


export type QuerySixMinutesForwardArgs = {
  input: Scalars['Time'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<DeepPartial<Scalars['Date']>>;
  Time: ResolverTypeWrapper<DeepPartial<Scalars['Time']>>;
  DateTime: ResolverTypeWrapper<DeepPartial<Scalars['DateTime']>>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<DeepPartial<Scalars['String']>>;
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars['Boolean']>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: DeepPartial<Scalars['Date']>;
  Time: DeepPartial<Scalars['Time']>;
  DateTime: DeepPartial<Scalars['DateTime']>;
  Query: {};
  String: DeepPartial<Scalars['String']>;
  Boolean: DeepPartial<Scalars['Boolean']>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  aWeekAgo?: Resolver<ResolversTypes['Date'], ParentType, ContextType, RequireFields<QueryAWeekAgoArgs, 'input'>>;
  christmasDay?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lunchTime?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  now?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  sixMinutesForward?: Resolver<ResolversTypes['Time'], ParentType, ContextType, RequireFields<QuerySixMinutesForwardArgs, 'input'>>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Time?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
