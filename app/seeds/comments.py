from app.models import db, environment, SCHEMA, Comment
from sqlalchemy.sql import text

def seed_comments(seeded_users, seeded_post):
    comment1 = Comment(
        posts = seeded_post[0],
        users = seeded_users[2],
        text = 'GREAT GEREAT GREAT',
    )
    comment2 = Comment(
        posts = seeded_post[1],
        users = seeded_users[0],
        text = 'TEST TEST TEST TEST',
    )
    comment3 = Comment(
        posts = seeded_post[2],
        users = seeded_users [1],
        text = 'WHAT WAHT WHATH AW',
    )

    all_comments = [comment1, comment2, comment3]
    add_comment = [db.session.add(comment) for comment in all_comments]
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(
            text('DELETE FROM comments')
        )
    db.session.commit()
