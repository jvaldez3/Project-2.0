create DATABASE pedalpalsDB;
use pedalpalsDB;

create table users
(
    id int not null
    auto_increment,
firstName varchar
    (100) not null,
lastName varchar
    (100) not null,
email varchar
    (100) not null,
password varchar
    (50) not null,
primary key
    (id)
);

    create table users
    (
        id int not null
        auto_increment,
firstName varchar
        (100) not null,
lastName varchar
        (100) not null,
email varchar
        (100) not null,
password varchar
        (50) not null,
primary key
        (id)
);

        create table userProfile
        (
            id int not null
            auto_increment,
    name varchar
            (100) not null,
    displayName varchar
            (100) not null,
    bio varchar
            (2000) not null,
    __fk_id int not null,
    primary key
            (id)
);

            create table usersBikes
            (
                bikeName varchar(100) not null primary key,
            );

            create table users_bikes
            (
                users_id int not null,
                bikeName varchar(100),
                primary key(users_id, bikeName)
            );

            create table routes
            (
                id int not null
                auto_increment,
    __fk_id int not null,
    primary key
                (id)
);

                create table quizAnswers
                (
                    id int not null
                    auto_increment,
    quest1 int not null default 1,
    quest2 int not null default 1,
    quest3 int not null default 1,
    quest4 int not null default 1,
    quest5 int not null default 1,
    quest6 int not null default 1,
    quest7 int not null default 1,
    quest8 int not null default 1,
    quest9 int not null default 1,
    quest10 int not null default 1,
    quest11 int not null default 1,
    quest12 int not null default 1,
    quest13 int not null default 1,
    quest14 int not null default 1,
    quest15 int not null default 1,
    __fk_id int not null,
    primary key
                    (id)
);


                    create table comparePals
                    (
                        id int not null
                        auto_increment,
    __fk_id int not null,
    primary key
                        (id)
);