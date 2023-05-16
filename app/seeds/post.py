from app.models import db, User, environment, SCHEMA, Post
from sqlalchemy.sql import text

def seed_posts(seeded_user):
    post1 = Post(
        user_id = seeded_user[0],
        text='I like banana to eat for food during breakfast',
        image_url='https://th-thumbnailer.cdn-si-edu.com/xK6NAJHiv_51fzn5sDiQt0eD5Is=/fit-in/1600x0/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/d5/24/d5243019-e0fc-4b3c-8cdb-48e22f38bff2/istock-183380744.jpg'
    )
    post2 = Post(
        user_id = seeded_user[1],
        text='Manga is better then Anime',
        image_url='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2FAnimemes%2Fcomments%2Fdksndc%2Fread_the_manga%2F&psig=AOvVaw2I95oF5yh1M9gaBfB-ClnI&ust=1684337150140000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIivjf6S-v4CFQAAAAAdAAAAABAE'
    )
    post3 = Post(
        user_id = seeded_user[2],
        text='Random Random Random Random Random',
        image_url='https://media.istockphoto.com/id/1336400835/vector/cartoon-dice-vector-illustration-on-white-background.jpg?s=612x612&w=0&k=20&c=MfAZZeS5B6eU25J-72mG8Ar-BDAZJgeIPV2jXBr-zjI='
    )

    all_post = [post1, post2, post3]
    add_post = [db.session.add(post) for post in all_post]
    db.session.commit()

    return all_post


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(
            text('DELETE FROM posts')
        )
    db.session.commit()
