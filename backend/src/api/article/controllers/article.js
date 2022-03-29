"use strict";

/**
 *  article controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async like(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi
      .service("api::article.article")
      .findOne(id, query);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    const increaseLikes = Number(sanitizedEntity.likes) + 1;
    await strapi.entityService.update(
      "api::article.article",
      sanitizedEntity.id,
      {
        data: {
          likes: increaseLikes,
        },
      }
    );

    return this.transformResponse(sanitizedEntity);
  },

  async findBySlug(ctx, populate) {
    ctx.query = { ...ctx.query, local: "en" };

    const { data, meta } = await super.find(ctx, { populate });

    const entity = await strapi
      .service("api::article.article")
      .findOne(data[0].id, ctx.query);

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    const increaseView = Number(sanitizedEntity.Views) + 1;

    await strapi.entityService.update(
      "api::article.article",
      sanitizedEntity.id,
      {
        data: {
          Views: increaseView,
        },
      }
    );
    return this.transformResponse(sanitizedEntity);
  },

  async find(ctx, populate) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: "en" };

    // Calling the default core action
    const { data, meta } = await super.find(ctx, { populate });

    //console.log("data", data[0].attributes.Images);

    // some more custom logic
    meta.date = Date.now();

    return { data, meta };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi
      .service("api::article.article")
      .findOne(id, query);

    const allEditions = await strapi.service("api::article.article").find({});

    const ids = allEditions.results.map((item) => item.id);

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    const increaseView = Number(sanitizedEntity.Views) + 1;

    await strapi.entityService.update(
      "api::article.article",
      sanitizedEntity.id,
      {
        data: {
          Views: increaseView,
        },
      }
    );
    return this.transformResponse(sanitizedEntity, { ids: ids });
  },
}));
