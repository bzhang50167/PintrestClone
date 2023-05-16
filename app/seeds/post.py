from app.models import db, User, environment, SCHEMA, Post
from sqlalchemy.sql import text

def seed_posts(seeded_user):
    post1 = Post(
        users = seeded_user[0],
        text='I like banana to eat for food during breakfast',
    )
    post2 = Post(
        users = seeded_user[1],
        text='Manga is better then Anime',
    )
    post3 = Post(
        users = seeded_user[2],
        text='Random Random Random Random Random',
    )

    all_post = [post1, post2, post3]
    add_post = [db.session.add(post) for post in all_post]
    db.session.commit()

    return all_post


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(
            text('DELETE FROM posts')
        )
    db.session.commit()
