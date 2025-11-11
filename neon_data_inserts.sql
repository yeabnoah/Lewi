--
-- PostgreSQL database dump
--

\restrict Arkl4WnrBSTYfbBFH9AWnHxN1MXTrQNST1YSCAmROs5Zz9zP7knoD8jvOHhJMVv

-- Dumped from database version 17.5 (6bc9ef8)
-- Dumped by pg_dump version 18.0 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public._prisma_migrations VALUES ('7b0fdc59-e5d6-4935-baa1-96c04d07de80', '9d44fa3dfc353b96d1ac6886f3aad8ea50bb3441420cdc5388ab8a9bd906535b', '2025-10-27 09:54:04.127824+00', '20251015093017_first_migration_from_better_t_stack', NULL, NULL, '2025-10-27 09:54:02.650808+00', 1);
INSERT INTO public._prisma_migrations VALUES ('5450239b-3ea9-4803-a517-0ce100a28d01', '39bf20bd021d7774233f8ec18aa9b030546477dd4e8f63d2d8f311a33ddce5d7', '2025-10-27 09:54:05.826762+00', '20251015104724_added_business_logic_schema', NULL, NULL, '2025-10-27 09:54:04.6492+00', 1);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."user" VALUES ('eWATIe4HumenXapYWO2U7jr7Spz8toaL', 'Naty', 'yeabnoah5@gmail.com', false, NULL, '2025-11-11 09:31:36.062', '2025-11-11 09:31:36.062');


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.account VALUES ('qo41JX4OdULJGdX9gZQIi0CCjgBhHPkI', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', 'credential', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', NULL, NULL, NULL, NULL, NULL, NULL, '69a38aabfe11116a2a268b3420de10bd:90eeef525022b5129e00da5b644184b5859a960df2b45be1bd7670950e921249c593d3afb72f8f8711a2c3af2f2ec77e4ac71838c2c29414bb0cb2d23b0cd64a', '2025-11-11 09:31:36.557', '2025-11-11 09:31:36.557');


--
-- Data for Name: outfit_suggestions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.session VALUES ('D3VO09akME9xs3DzKZt5QfosMpDd4g36', '2025-11-18 09:31:37.06', 'grGXlbNgqUKXLuS7KtPlGCCA4WaNWWKG', '2025-11-11 09:31:37.06', '2025-11-11 09:31:37.06', '127.0.0.1', 'Expo/54.0.6 CFNetwork/3860.100.1 Darwin/24.6.0', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL');
INSERT INTO public.session VALUES ('0jZrqJT6s01n93HsK60we3dK60CtD0fF', '2025-11-18 09:31:49.555', 'wO7aO73eoBroQ2d1AKGFxM0YxX8zTu6t', '2025-11-11 09:31:49.555', '2025-11-11 09:31:49.555', '127.0.0.1', 'Expo/54.0.6 CFNetwork/3860.100.1 Darwin/24.6.0', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL');
INSERT INTO public.session VALUES ('Mpv05fAW2KHicJgSJRtSFmptTSp27cei', '2025-11-18 09:39:03.54', '4L8DLDVE47Fv2BqCb9oJ69VbkrKrhTj0', '2025-11-11 09:39:03.541', '2025-11-11 09:39:03.541', '127.0.0.1', 'okhttp/4.12.0', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL');
INSERT INTO public.session VALUES ('ZBckjVKsvSPXCqfAmwrGXAu2dACVZqXL', '2025-11-18 10:52:28.435', 'D0W9a47nuw4OXzBrwCEhj6KZbB9WWws2', '2025-11-11 10:52:28.435', '2025-11-11 10:52:28.435', '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL');


--
-- Data for Name: style_request; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: verification; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: virtual_tryon; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: wardrobe_item; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.wardrobe_item VALUES ('e6532366-392f-402e-bb1e-7dc99355920a', 'Olive Green Camp Shirt', 'A short-sleeved button-down shirt in olive green with a camp collar and gold buttons. The fabric has a subtle textured appearance.', 'https://iqbkplmiijyoybbrksyo.supabase.co/storage/v1/object/public/lewi-bucket/uploads/1762854398533.jpg', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', '2025-11-11 09:46:47.789', '2025-11-11 09:46:47.789', 'olive green', 'TOP');
INSERT INTO public.wardrobe_item VALUES ('f8e7f59d-8405-4dd4-91c0-bf7a861b8b0f', 'Floral Print Short Sleeve Shirt', 'A yellow short-sleeve button-up shirt with a floral print featuring white and brown flowers with green leaves.', 'https://iqbkplmiijyoybbrksyo.supabase.co/storage/v1/object/public/lewi-bucket/uploads/1762854426111.jpg', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', '2025-11-11 09:47:53.812', '2025-11-11 09:47:53.812', 'yellow', 'TOP');
INSERT INTO public.wardrobe_item VALUES ('7a031b65-7a24-4c6c-82ae-922c7c8ffb04', 'Textured Knit Polo Shirt', 'A white, short-sleeved polo shirt with a textured knit pattern featuring diamond shapes and cable knit-like vertical stripes. It has a classic polo collar with a two-button placket and rolled-up sleeve cuffs.', 'https://iqbkplmiijyoybbrksyo.supabase.co/storage/v1/object/public/lewi-bucket/uploads/1762854493312.jpg', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', '2025-11-11 09:48:23.736', '2025-11-11 09:48:23.736', 'White', 'TOP');
INSERT INTO public.wardrobe_item VALUES ('9f732145-a716-4119-b50a-7ab9ba3209be', 'Brown Short Sleeve Shirt', 'A brown, short-sleeved button-down shirt with a collared neckline, front button closure, chest pocket, and rolled-up sleeves. The fabric appears to be a corduroy or similar textured material.', 'https://iqbkplmiijyoybbrksyo.supabase.co/storage/v1/object/public/lewi-bucket/uploads/1762854520677.jpg', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', '2025-11-11 09:48:51.96', '2025-11-11 09:48:51.96', 'Brown', 'TOP');
INSERT INTO public.wardrobe_item VALUES ('d2f7d9af-9864-4030-a82c-2a2a66621839', 'Gray Wash Denim Jeans', 'Dark gray wash denim jeans with a classic five-pocket design, button fly closure, and straight leg cut. Made from durable cotton denim.', 'https://iqbkplmiijyoybbrksyo.supabase.co/storage/v1/object/public/lewi-bucket/uploads/1762854556303.jpg', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', '2025-11-11 09:49:23.344', '2025-11-11 09:49:23.344', 'Gray', 'BOTTOM');
INSERT INTO public.wardrobe_item VALUES ('b5c06633-90ef-4f1b-b61f-ff4ea28080fa', 'Wide Leg Jeans', 'Light wash denim jeans with a wide leg and classic five-pocket styling.', 'https://iqbkplmiijyoybbrksyo.supabase.co/storage/v1/object/public/lewi-bucket/uploads/1762854600942.jpg', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', '2025-11-11 09:50:08.932', '2025-11-11 09:50:08.932', 'Blue', 'BOTTOM');
INSERT INTO public.wardrobe_item VALUES ('21515e3a-fcc3-4453-acbc-51ef19c0c154', 'Black Sweatshorts', 'Classic black sweatshorts with an elastic waistband and drawstring closure, featuring a relaxed fit and side pockets. Perfect for casual wear.', 'https://iqbkplmiijyoybbrksyo.supabase.co/storage/v1/object/public/lewi-bucket/uploads/1762854623103.jpg', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', '2025-11-11 09:50:31.582', '2025-11-11 09:50:31.582', 'Black', 'BOTTOM');
INSERT INTO public.wardrobe_item VALUES ('473b7dee-cf79-4122-ade2-ee41e3d53a77', 'Grey Sweat Shorts', 'Light grey knit shorts with an elasticated drawstring waist and side pockets.', 'https://iqbkplmiijyoybbrksyo.supabase.co/storage/v1/object/public/lewi-bucket/uploads/1762854653227.jpg', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', '2025-11-11 09:51:00.595', '2025-11-11 09:51:00.595', 'grey', 'BOTTOM');
INSERT INTO public.wardrobe_item VALUES ('d5f54120-fd68-4ed1-a890-217616b345a5', 'Nike Dunk Low Green', 'Nike Dunk Low featuring a white leather base with green overlays and a navy swoosh.', 'https://iqbkplmiijyoybbrksyo.supabase.co/storage/v1/object/public/lewi-bucket/uploads/1762854683950.jpg', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', '2025-11-11 09:51:33.881', '2025-11-11 09:51:33.881', 'green', 'ACCESSORY');
INSERT INTO public.wardrobe_item VALUES ('572a5346-4372-4a97-8cf3-1906f6cdf721', 'New Balance 530 Sneakers', 'White New Balance 530 athletic sneakers with mesh and synthetic overlays, featuring a navy blue inner lining and logo details, with white laces and a white midsole.', 'https://iqbkplmiijyoybbrksyo.supabase.co/storage/v1/object/public/lewi-bucket/uploads/1762854705662.jpg', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', '2025-11-11 09:51:54.132', '2025-11-11 09:51:54.132', 'White', 'ACCESSORY');
INSERT INTO public.wardrobe_item VALUES ('18e41c49-d6dc-4946-86d5-49abefbc82c3', 'Fuzzy Slippers', 'A pair of comfortable, light gray, fuzzy slippers with a plush interior and a small brown accent.', 'https://iqbkplmiijyoybbrksyo.supabase.co/storage/v1/object/public/lewi-bucket/uploads/1762854728970.jpg', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', '2025-11-11 09:52:22.446', '2025-11-11 09:52:22.446', 'gray', 'ACCESSORY');
INSERT INTO public.wardrobe_item VALUES ('1e9a1774-e215-4b3f-a229-f002590a9281', 'Black Slides', 'A pair of black slides with a thick strap and a comfortable sole, potentially made of rubber or synthetic material. The straps feature a textured or padded detail.', 'https://iqbkplmiijyoybbrksyo.supabase.co/storage/v1/object/public/lewi-bucket/uploads/1762854753891.jpg', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', '2025-11-11 09:52:41.587', '2025-11-11 09:52:41.587', 'black', 'ACCESSORY');
INSERT INTO public.wardrobe_item VALUES ('6e7ede43-484f-4bcb-ac67-da8bb7a51379', 'White Ribbed Tank Top', 'A classic white ribbed tank top with a round neckline and sleeveless design. The fabric is likely cotton or a cotton blend, providing comfort and breathability. A versatile basic piece suitable for layering or wearing alone.', 'https://iqbkplmiijyoybbrksyo.supabase.co/storage/v1/object/public/lewi-bucket/uploads/1762858466727.jpg', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', '2025-11-11 10:56:10.215', '2025-11-11 10:56:10.215', 'white', 'TOP');
INSERT INTO public.wardrobe_item VALUES ('fda47e89-da79-4270-ad8f-db4e235fc516', 'Tribal Print T-Shirt', 'A short-sleeved t-shirt featuring a solid body with ''Attract'' script, complemented by a vertical panel of tribal-inspired geometric patterns along one side. The shirt has a crew neck and rolled-up sleeves, creating a casual and stylish look.', 'https://iqbkplmiijyoybbrksyo.supabase.co/storage/v1/object/public/lewi-bucket/uploads/1762858516167.jpg', 'eWATIe4HumenXapYWO2U7jr7Spz8toaL', '2025-11-11 10:57:00.915', '2025-11-11 10:57:00.915', 'beige', 'TOP');


--
-- PostgreSQL database dump complete
--

\unrestrict Arkl4WnrBSTYfbBFH9AWnHxN1MXTrQNST1YSCAmROs5Zz9zP7knoD8jvOHhJMVv

