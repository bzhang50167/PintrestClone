from app.models import db, environment, SCHEMA, Group
from sqlalchemy.sql import text

def seed_groups(seeded_users, seeded_posts):
    group1 = Group(
        name='Shonen',
        users= seeded_users[0],
        group_posts= [seeded_posts[0], seeded_posts[1]]
    )
    group2 = Group(
        name='Shojo',
        users= seeded_users[1],
        group_posts= [seeded_posts[1], seeded_posts[2]]
    )
    group3 = Group(
        name='Conan',
        users= seeded_users[2],
        group_posts= [seeded_posts[0], seeded_posts[2]]
    )

    all_groups = [group1, group2, group3]
    add_groups = [db.session.add(group) for group in all_groups]
    db.session.commit()

def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(
            text('DELETE FROM groups')
        )
    db.session.commit()
