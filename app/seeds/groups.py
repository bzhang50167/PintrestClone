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
        group = Group(
            name=name[i % len(name)],
            users= seeded_users[i % len(seeded_users)],
            group_post=[seeded_posts[i % len(seeded_posts)],
                        seeded_posts[i % len(seeded_posts)],
                        seeded_posts[i % len(seeded_posts)]
                        ]
        )
        all_groups.append(group)

    add_group = [db.session.add(group)]
    add_groups = [db.session.add(group) for group in all_groups]
    db.session.commit()

def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(
            text('DELETE FROM groups')
        )
    db.session.commit()
