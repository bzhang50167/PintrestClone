from app.models import db, environment, SCHEMA, Group
from sqlalchemy.sql import text

def seed_groups(seeded_users, seeded_posts):
    all_groups = []

    name = [
        'Shonen',
        'Shojo',
        'Spots',
        'Isekai',
        'Slice of Life',
        'Fantasy',
        'Mystery',
        'Horror',
        'Romance',
        'Thriller',
        'Ecchi',
        'Idol'
    ]

    for i in range(12):
        group_posts = []
        for j in range(3):
            group_posts.append(seeded_posts[(i + j) % len(seeded_posts)])

        group = Group(
            name=name[i % len(name)],
            users=seeded_users[i % len(seeded_users)],
            group_posts=group_posts
        )
        all_groups.append(group)

    add_groups = [db.session.add(group) for group in all_groups]
    db.session.commit()
    # group1 = Group(
    #     name='Shonen',
    #     users= seeded_users[0],
    #     group_posts= [seeded_posts[0], seeded_posts[1]]
    # )
    # group2 = Group(
    #     name='Shojo',
    #     users= seeded_users[1],
    #     group_posts= [seeded_posts[1], seeded_posts[2]]
    # )
    # group3 = Group(
    #     name='Conan',
    #     users= seeded_users[2],
    #     group_posts= [seeded_posts[0], seeded_posts[2]]
    # )

    # all_groups = [group1, group2, group3]

def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(
            text('DELETE FROM groups')
        )
    db.session.commit()
