import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { title } from "process";

export const archive = mutation({
  args: { id: v.id("documents")},
  handler : async (ctx, args) => {
     const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingDocumnet = await ctx.db.get(args.id);
    if(!existingDocumnet){
      throw new Error("Document not found");
    }

    if(existingDocumnet.userId !== userId){
      throw new Error("Unauthorized")
    }

    const reursiveArchive = async (documentId : Id<"documents">) => {

      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>(
          q.eq("userId", userId).eq("parentDocument", documentId)
        ))
        .collect();

        for (const child of children) {
          await ctx.db.patch(child._id, {
            isArchived: true,
          });
          await reursiveArchive(child._id);
        }
    }

    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    reursiveArchive(args.id);

    return document;
  }
})

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const documents = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return documents;
  },
});


export const getTrash =  query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if(!identity){
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;


    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) =>
        q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();
    return documents;
  }
})


export const restore = mutation({
  args: {id: v.id("documents")},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if(!identity){
      throw new Error("Not authenticated");
    }

    const userId = identity.subject; 


    const existingDocument = await ctx.db.get(args.id);
    if(!existingDocument){
      throw new Error("Document not found");
    }

    if(existingDocument.userId !== userId){
      throw new Error("Unauthorized");
    }

    const reursiveRestore = async (documentId: Id<"documents">) => {
      const children = await ctx.db.query("documents")
        .withIndex("by_user_parent", (q) =>q.eq("userId", userId).eq("parentDocument", documentId))
        .collect();

        for( const child of children) {
          await ctx.db.patch(child._id, {
            isArchived: false,
          });
          await reursiveRestore(child._id);
        }
    }
    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    }


  if (existingDocument.parentDocument) {
    const parent = await ctx.db.get(existingDocument.parentDocument);
    if (!parent?.isArchived) {
      options.parentDocument = undefined;
    }
  }
 const document =  await ctx.db.patch(args.id, options);

   reursiveRestore(args.id);

   return document;
}
});


export const remove  = mutation({
  args: {id: v.id("documents")},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if(!identity){
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);
    if(!existingDocument){
      throw new Error("Document not found");
    }

    if(existingDocument.userId !== userId){
      throw new Error("Unauthorized");
    }

    const document =  await ctx.db.delete(args.id);

    return document;
  }
});

export const getSearch = query( {
  handler: async(ctx) =>{
     const identity = await ctx.auth.getUserIdentity();

    if(!identity){
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const documents = await ctx.db.query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) =>
        q.eq(q.field("isArchived"), false),
      )
      .order("desc")
      .collect()
    

      return documents;
  }
})