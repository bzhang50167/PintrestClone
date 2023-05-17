from app.models import db, User, environment, SCHEMA, Post
from sqlalchemy.sql import text

def seed_posts(seeded_user):
    post1 = Post(
        users = seeded_user[0],
        text='I like banana to eat for food during breakfast',
        image_url='http://audiodome-songs.s3.amazonaws.com/0bc63f85407d4f848a524edaa7819e06.jpeg',
        title = 'Opppes forgot this Title'
    )
    post2 = Post(
        users = seeded_user[1],
        text='Manga is better then Anime',
        image_url='http://audiodome-songs.s3.amazonaws.com/9f26e778c519466bba6c448a6dec2fae.jpeg',
        title = 'Opppes forgot this Title'
    )
    post3 = Post(
        users = seeded_user[2],
        text='Random Random Random Random Random',
        image_url='http://audiodome-songs.s3.amazonaws.com/58e1025317b048859c3e21f9581577da.jpg',
        title = 'Opppes forgot this Title'
    )

    all_post = [post1, post2, post3]
    add_post = [db.session.add(post) for post in all_post]
    db.session.commit()

    return all_post


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(
            text('DELETE FROM posts')
        )
    db.session.commit()
