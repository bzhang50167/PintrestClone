from .db import db, add_prefix_for_prod, environment, SCHEMA

group_posts = db.Table(
    'group_posts',
    db.Model.metadata,
    db.Column("groups", db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')), primary_key=True),
    db.Column("post", db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), primary_key=True),
)

if environment == "production":
    group_posts.schema = SCHEMA
