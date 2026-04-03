CREATE TABLE public.achievements (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    criteria_type character varying(50) NOT NULL,
    criteria_value integer NOT NULL,
    reward_points integer DEFAULT 50,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    badge_image_url character varying(255)
);


CREATE SEQUENCE public.achievements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.achievements_id_seq OWNED BY public.achievements.id;


--
-- Name: pets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pets (
    id integer NOT NULL,
    user_id integer,
    name character varying(50) NOT NULL,
    type character varying(20) DEFAULT 'dog'::character varying,
    level integer DEFAULT 1,
    experience integer DEFAULT 0,
    hunger integer DEFAULT 50,
    happiness integer DEFAULT 50,
    energy integer DEFAULT 50,
    last_interaction timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pets_energy_check CHECK (((energy >= 0) AND (energy <= 100))),
    CONSTRAINT pets_happiness_check CHECK (((happiness >= 0) AND (happiness <= 100))),
    CONSTRAINT pets_hunger_check CHECK (((hunger >= 0) AND (hunger <= 100)))
);


--
-- Name: pets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pets_id_seq OWNED BY public.pets.id;


--
-- Name: shop_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shop_items (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    item_type character varying(20) NOT NULL,
    effect_type character varying(20) NOT NULL,
    effect_value integer DEFAULT 10,
    cost_points integer NOT NULL,
    rarity character varying(20) DEFAULT 'common'::character varying,
    image_url character varying(255),
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: shop_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shop_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shop_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shop_items_id_seq OWNED BY public.shop_items.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    user_id integer,
    title character varying(200) NOT NULL,
    description text,
    priority character varying(10) DEFAULT 'medium'::character varying,
    difficulty character varying(10) DEFAULT 'medium'::character varying,
    due_date timestamp without time zone,
    completed boolean DEFAULT false,
    completed_at timestamp without time zone,
    points_worth integer DEFAULT 10,
    points_earned integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: user_achievements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_achievements (
    id integer NOT NULL,
    user_id integer,
    achievement_id integer,
    earned_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: user_achievements_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_achievements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_achievements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_achievements_id_seq OWNED BY public.user_achievements.id;


--
-- Name: user_inventory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_inventory (
    id integer NOT NULL,
    user_id integer,
    item_id integer,
    quantity integer DEFAULT 1,
    purchased_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: user_inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_inventory_id_seq OWNED BY public.user_inventory.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    points integer DEFAULT 0,
    level integer DEFAULT 1,
    streak_days integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: achievements id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.achievements ALTER COLUMN id SET DEFAULT nextval('public.achievements_id_seq'::regclass);


--
-- Name: pets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pets ALTER COLUMN id SET DEFAULT nextval('public.pets_id_seq'::regclass);


--
-- Name: shop_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shop_items ALTER COLUMN id SET DEFAULT nextval('public.shop_items_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: user_achievements id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_achievements ALTER COLUMN id SET DEFAULT nextval('public.user_achievements_id_seq'::regclass);


--
-- Name: user_inventory id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_inventory ALTER COLUMN id SET DEFAULT nextval('public.user_inventory_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: achievements achievements_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT achievements_name_key UNIQUE (name);


--
-- Name: achievements achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

--
-- Name: pets pets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT pets_pkey PRIMARY KEY (id);


--
-- Name: pets pets_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT pets_user_id_key UNIQUE (user_id);


--
-- Name: shop_items shop_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shop_items
    ADD CONSTRAINT shop_items_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: user_achievements user_achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_pkey PRIMARY KEY (id);


--
-- Name: user_achievements user_achievements_user_id_achievement_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_user_id_achievement_id_key UNIQUE (user_id, achievement_id);


--
-- Name: user_inventory user_inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT user_inventory_pkey PRIMARY KEY (id);


--
-- Name: user_inventory user_inventory_user_id_item_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT user_inventory_user_id_item_id_key UNIQUE (user_id, item_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: idx_inventory_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_user ON public.user_inventory USING btree (user_id);


--
-- Name: idx_pets_last_interaction; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pets_last_interaction ON public.pets USING btree (last_interaction);


--
-- Name: idx_pets_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pets_user_id ON public.pets USING btree (user_id);


--
-- Name: idx_tasks_due_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tasks_due_date ON public.tasks USING btree (due_date) WHERE (completed = false);


--
-- Name: idx_tasks_user_completed; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tasks_user_completed ON public.tasks USING btree (user_id, completed);


--
-- Name: idx_user_achievements_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_achievements_user ON public.user_achievements USING btree (user_id);


--
-- Name: pets pets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT pets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: tasks tasks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_achievements user_achievements_achievement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_achievement_id_fkey FOREIGN KEY (achievement_id) REFERENCES public.achievements(id) ON DELETE CASCADE;


--
-- Name: user_achievements user_achievements_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_inventory user_inventory_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT user_inventory_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.shop_items(id) ON DELETE CASCADE;


--
-- Name: user_inventory user_inventory_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT user_inventory_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

--
-- Populate Database
--

-- Seed Shop Items into Database
INSERT INTO public.shop_items (id, name, description, item_type, effect_type, effect_value, cost_points, rarity)
VALUES 
(1, 'Premium Pet Food', 'Delicious meal', 'food', 'hunger', 30, 20, 'common'),
(2, 'Bouncy Ball', 'Fun toy', 'toy', 'happiness', 25, 35, 'uncommon'),
(13, 'Gourmet Feast', 'A luxurious meal that satisfies hunger completely', 'food', 'hunger', 50, 45, 'rare'),
(14, 'Energy Snack', 'Quick energy boost for your pet', 'food', 'energy', 25, 30, 'uncommon'),
(15, 'Healthy Treat', 'Nutritious snack that boosts happiness', 'food', 'happiness', 20, 25, 'common'),
(16, 'Squeaky Mouse', 'Irresistible toy for cats', 'toy', 'happiness', 30, 40, 'uncommon'),
(17, 'Flying Disc', 'Perfect for active dogs', 'toy', 'happiness', 35, 50, 'rare'),
(18, 'Puzzle Feeder', 'Mental stimulation toy', 'toy', 'happiness', 20, 55, 'rare'),
(19, 'Rainbow Scarf', 'Colorful accessory for any pet', 'accessory', 'cosmetic', 0, 60, 'uncommon'),
(20, 'Magic Cape', 'Makes your pet look heroic', 'accessory', 'cosmetic', 0, 120, 'epic'),
(21, 'Sparkly Collar', 'Shiny accessory that boosts mood', 'accessory', 'happiness', 10, 45, 'rare'),
(22, 'Super Elixir', 'Restores all stats by 20', 'consumable', 'all', 20, 80, 'epic'),
(23, 'Happiness Potion', 'Instantly boosts happiness', 'consumable', 'happiness', 40, 50, 'rare'),
(24, 'Energy Drink', 'Restores 50 energy', 'consumable', 'energy', 50, 45, 'uncommon'),
(25, 'Legendary Feast', 'A meal fit for a champion', 'food', 'all', 40, 100, 'legendary'),
(26, 'Laser Pointer', 'Hours of entertainment', 'toy', 'happiness', 45, 65, 'rare'),
(27, 'Golden Crown', 'Royal accessory', 'accessory', 'cosmetic', 0, 200, 'legendary'),
(28, 'Mystery Box', 'Surprise effect!', 'consumable', 'random', 0, 75, 'epic')
ON CONFLICT (id) DO NOTHING;

-- Seed Achievements into Render Database
INSERT INTO public.achievements (id, name, description, criteria_type, criteria_value, reward_points)
VALUES 
(5, 'First Step', 'Complete your first task', 'tasks_completed', 1, 10),
(6, 'Task Master', 'Complete 10 tasks', 'tasks_completed', 10, 50),
(7, 'Productivity Guru', 'Complete 50 tasks', 'tasks_completed', 50, 200),
(8, 'Point Collector', 'Earn 100 points', 'points_earned', 100, 25),
(9, 'Point Millionaire', 'Earn 1000 points', 'points_earned', 1000, 100),
(10, 'Weekly Warrior', 'Maintain a 7-day streak', 'streak_days', 7, 75),
(11, 'Monthly Champion', 'Maintain a 30-day streak', 'streak_days', 30, 200),
(12, 'Pet Lover', 'Reach pet level 5', 'pet_level', 5, 50),
(13, 'Pet Master', 'Reach pet level 10', 'pet_level', 10, 100)
ON CONFLICT (id) DO NOTHING;