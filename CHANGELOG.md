# Changelog

## [0.1.0](https://github.com/LetsUpgrade-Labs/lisa-ai/compare/v0.0.1...v0.1.0) (2024-04-16)


### 🐛 Bug Fixes

* 'zustand devtools middleware' warning issue fixed ([b7c67a0](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/b7c67a007f7cf9fca3f13f8b8934e8b8e95abee4))
* audio states fixed ([dfa4b7c](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/dfa4b7c3b85246be7feb08a29f24b0cb931d28af))
* BASE_PATH fixed for ai chat ([45b6ac0](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/45b6ac0d5e619b574f676140896e62490b0450d7))
* **basePath:** basePath issue fixed to resolve multi basePath config ([6f35c1a](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/6f35c1a6dc222fe6b7677508847103081bf0b7a9))
* chat-with-function 'Internal Server Error' fixed by downgrading openai model to gpt-3.5-turbo ([5b164ad](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/5b164ad655b9d6b9b82df1486a9cf5464a3f84f8))
* improved location property check added for onboarding location fetch ([5401edd](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/5401edd96423e9555b1ccf87c28f5545cccb640d))
* location property check added for onboarding location fetch ([6f006b3](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/6f006b3824964f98cf81f35dde21d7f09b0a79ec))
* missing image remotePattern added for prod env ([700b872](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/700b872613fad0587a158e5806f4c74c833c4746))
* onboarding api url fixed ([c49c9ca](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/c49c9ca8eb139b43160916970dd770f20f22e6ac))
* onChange logic fixed for single selection of option ([d638518](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/d638518689053fcd2aebbc7cadc45b103ac2a7ae))
* pwa start_url value fixed to basePath ([38df72b](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/38df72b93838297e65002a589dd7af4dbf21b3a4))
* resources api response data extraction fixed ([6e80517](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/6e805177a88ea6a0c72f86fe8adf0bb7c6a62773))
* route replace and ready state made conditional to avoid RSC errors ([fd4a9c0](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/fd4a9c0d17382019d82c741a41ce99f622f6b9ac))
* socials property check added for profile page ([4724fe8](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/4724fe8f15bd96ad99bccda498951af01ba403b7))
* suspense boundary added for 'useSearchParams' to avoid csr bailout ([1b29872](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/1b298721b073aaf98dd97caedd713f0bda0455a4))
* type definition fixed for 'HierarchyCard' ([a3eec77](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/a3eec778f78586b0c7d39e91df9d23dd79b03061))
* type definition fixed for ai content functions & ui ([7eb0527](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/7eb052717dbdcc42c73f000e4a20675c018e27ca))
* type definitions for slides fixed w/ courseId & topicId extraction refactored ([7a81c6c](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/7a81c6c60833fba793af0ef16618838611704a24))
* usePostHog hook used to get posthog to capture events instead of import ([2d4dca9](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/2d4dca9361bd3be7cd5acd0b8e9b9a28192f73e2))


### 🎨 Styles

* 100vh sizing updated for available screen size instead of predefined sizing ([5561cc0](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/5561cc06aa159623578659472e077d9d23b58ffd))
* background image added with starry nights bg ([d6d9470](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/d6d94706aafd0bb9f93ccc40674f06c3927b199b))
* bookmarks page styling changed ([695db19](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/695db19c437a34e443c27d6756ff8d86744332d7))
* button and background styles changed ([83e8794](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/83e879413f4f55cda91d3bdbe331c3b8f4c3f378))
* dashboard page styles changed ([beb9a68](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/beb9a68d796fa1afd91fc8652ce53eec5ccb4c6f))
* hierarchy breadcrumb peek colors updated ([1cfe7bf](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/1cfe7bf50b820bbdad8ff813b2d19a76ccc878fe))
* hierarchy icons color styles changed ([9ade646](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/9ade646d24b32ac4a98539e63c31a9f885179cec))
* hierarchy peek & error page btns styles updated ([a3129d0](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/a3129d05e38d1d342e255deaba9c1703e180fe78))
* **hierarchyView:** hierarchyView styles changed ([092e71e](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/092e71e286d1c32bac5c856f5c5834fc578afa65))
* home screen restyled with course carousel & hierarchy peek view for topic cards ([08324b4](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/08324b4b0dfb809983ef7851929770c1a7f59337))
* icons and chat message styles changed ([ebcae9e](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/ebcae9e97606f022336475f9da5c786ab3b06bf5))
* loading style changed from loader to icon ([0cf77fa](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/0cf77fa9dda7c42d8d1c9d2b695bea6bc40e6871))
* minor style fix for bookmark icon & hierarchy flow content count badge ([684a82f](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/684a82f3bb9b991d2bed372b59818619a91fce0d))
* minor style update for DriveFile ([37812a5](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/37812a555dfde2a4dca93c8f38683f70124ee2c4))
* minor style updates ([f4f4e93](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/f4f4e93359bccbd7044e5118be1c1f5d32ec833b))
* minor styling update ([9d181ec](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/9d181ec9b42b489bc2f40def9908284aeca5fa59))
* **notFound:** not found page restyled ([e33a2a7](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/e33a2a77466ddc3b2d92ad6c310e457a14ea5d82))
* **onboarding:** minor styles changed in onboarding page ([d1ba3aa](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/d1ba3aa6ec243df86046ca853c89b9c369a7a131))
* resource overflow issue fixed ([794b206](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/794b2065003385cad448c05ea709861bd4e2d619))
* search menu styling updated & fixed hierarchy card base routing ([99747c1](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/99747c18f194f6e8cfd5ef7cb6149a854d9ff80e))
* **ui:** ui components styles changed and skeleton added ([e3d600b](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/e3d600bf4229a0dfe96921179872ee9830bb4178))


### :recycle: Code Refactoring

* **aiCalling:** function calling in ai refactored under useEffect ([63c8e93](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/63c8e93225667c619e92f8611c8607971291f09e))
* basePath dependent setup refactored with additional client env var for basePath ([6245a7f](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/6245a7ff27bdeea538288978f094abe9727b9a1f))
* buttons ui refactored and useConfetti hook added ([a9423ce](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/a9423ce858ed79ce2df6b9330e4e5bf1b547ed96))
* conditions to call ai refactored in useEffect ([0fe1374](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/0fe1374bec31ca7d9b602ead8ca2db5c710cd311))
* cookie storage pattern updated to even store in header cookies for faster initial access ([a7787bf](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/a7787bfb2c76a88a6178703009fa597e28cb2ee6))
* customFetch refactored to optimize promise and added guard clause in getHierarchyData ([2d8c62f](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/2d8c62f1757a9671d72e41d6e8d35578d815005b))
* disable slide translation when ai data is loading & audio when langCode is not 'en' ([c26a870](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/c26a870f22550881d2c6baadb8b007e53f574f25))
* disabled caching for topics & user profile api ([d2d4756](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/d2d475641d751ab5687172ba91678a57d93c301f))
* **env:** env validation error message format fixed ([9704914](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/97049148cad564bf2fc4c78dcdf255848dec821c))
* **env:** env validation error message refactored to have additional info ([875b4c1](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/875b4c16e79c11e0b21d2b90e79f79222139e179))
* explanation ai prompt & user input for it refactored ([a47b47e](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/a47b47e32d156a816cb191a4e7ae583b34aa2e58))
* feedback, audio & copy function handling logic refactored ([926e28b](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/926e28bb90f649d5dfd898925755e3af6c48d910))
* getSlides server action resp handling refactored to handle empty data ([846b0c1](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/846b0c1fb8403a84c6e0f24da907e3d765add731))
* global search refactored to auto close on card click ([f238b8c](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/f238b8cd7c60ad6a86b4fa0ac08ef01fdfd019d3))
* hierarchy peek component added to refactor the repeated usage ([5d299ed](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/5d299ed503a0c441004b7078d5e1e5a5a5890bae))
* hierarchy scrolling enabled ([7388a1b](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/7388a1b1575cee1489e66f7b4ca2a8031b1b3ed3))
* home loading ui sequencing & minor code cleaning ([262af77](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/262af77888bd51cfc08039afc0864a02b78cea5f))
* improve hierarchy slug manager to validate if ID is MongoDB ObjectId else redirect to 404 ([61010f2](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/61010f2a0dc06a2a5a8abfe4368f467f91326e69))
* invoke ipdata conditionally based on user profile location data ([f6f3b70](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/f6f3b70ab10412b6d184c9d1d96b10c18686c2be))
* isLastSlide prop added and slides prompt refactored ([c8199ae](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/c8199aeb82be17d0f48d6e241a069be5f1acb0ff))
* **loaders:** loaders added in the app ([a1900bf](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/a1900bf4ef6c8ed88365fafedd1256b1d3ddd6dc))
* manifest.json path made dependent on basePath ([edadb42](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/edadb4247f006f230c65caf60ebfb4b41a3976ea))
* NEXT_PUBLIC_APP_DOMAIN converted to default empty string in env setup ([f5edffc](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/f5edffcd2938f22d07f3246cb19df0527c70fd19))
* NEXT_PUBLIC_APP_DOMAIN made optional in env setup ([e9c5e22](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/e9c5e22e9181a0f27ff6372556e64c8edae9f8e6))
* onboarding interests calculation refactored ([a69e4eb](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/a69e4ebfd1bbbbcf1252db896148f5096ebf24fc))
* onboarding schema refactored to have minimum of 5 interests in total ([921fbb4](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/921fbb475ea9fde7e7c5738b31bb8516bcb31c9d))
* onboarding submit btn enabled only if form state is valid ([5b4f317](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/5b4f317f23f54ff38359a0f8bd526f16d37d413b))
* per page based loaders refactored to have skeleton loader ([9848f47](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/9848f47733444d2cd78be01fcc0a6ecf5226903b))
* practice questions generation refactored with chat-with-functions ([f542ade](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/f542ade8502c1e8504bd20b49e002801f3cca4b7))
* profile edit refactored to support profile & cover image update ([bf44bd2](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/bf44bd2bdcc1df36a604ae58d05c132b98a0fe0d))
* profile view made information conditional if not available ([a084841](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/a0848418ac3c6f2728e20aaa22e8006e249042c5))
* prompt refactored for slides and skeleton added in search ([d7c91fe](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/d7c91fec6d48a37da123a69119db06b10d85e108))
* **prompt:** openai prompt refactored to arrange priorities ([f6339c1](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/f6339c15e888951f0c4e4f174e31c35c924aa65b))
* replaced console.log for vercel sdk for error with console.error ([1dd193d](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/1dd193d5da174097d66e318383ac515f809d0e2f))
* replaced generative ui for slides with open ai function call via useChat ([4bd3b07](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/4bd3b0781a29d5c19fae5d32a58915ca721623ce))
* slides duration recording api invocation refactored & minor refactoring for quiz answer ([d4e326b](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/d4e326bd94c2055de385ebb45f173a705f548485))
* slides generation refactored with chat-with-functions ([3a8f285](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/3a8f28577529d0f68664e09ef76065ff37152d2e))
* tts logic refactored to work via custom hook w/ broken chat tts ([fbe4064](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/fbe4064435fb1a23c3769cfcc5af4a03fafefc20))
* ui refactored and skeleton added in topic section ([06df5e3](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/06df5e3040e1913a8dcd6fbfde262048f8a32a40))
* user profile menu refactored ([47c2c29](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/47c2c29f0fcfbd3ce70da79b55db26b5ae34b693))
* userContext and hierarchyContext refactored ([726e4dd](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/726e4dd7ee10f168e0a44ca6d449bb3ee7a5d262))


### * Chores

* console.error added for debugging ([dfaa945](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/dfaa945714ac2dd2b4ce0679e894319836798223))


### ⏪ Reverts

* commented hierarchy cards reverted ([dcc5c1d](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/dcc5c1db9f03da65a69aeb4a323c769e78241a78))
* posthog re-integrated ([bf5f183](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/bf5f1834de36c359d5ed91deb15f09a642664d15))


### 🗑️ Security

* [@jam](https://github.com/jam).dev/sdk removed due to TS issues ([c25be81](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/c25be817e5670304829ef6b554185e13317d0a09))
* no-store caching logic removed from user ([7060ab1](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/7060ab1462667268493feafa334f69fbc9417845))
* posthog integration removed ([c37c496](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/c37c496bf14fde93d48bb375042424a20a9b2a6c))
* remove & ignore type definitions for ContentPagination ([33b55f5](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/33b55f597566ab46d93ffd4ddf5738552edf48b0))


### :heavy_plus_sign: Add

* **ai:** vercel ai intergrated with server action functions ([10b7129](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/10b7129df7b85d2945f652e6eb4194210629549b))
* **answerQuiz:** quiz answer api added to quiz state ([0ee3fc9](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/0ee3fc9b24e52f70942aa1e47227d6e5a3eabc94))
* auto generate route for hierarchy cards when out for hierarchy flow ([e8f65c6](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/e8f65c65777ea1c02c7a9f25bb2776189de534a9))
* basic authProvider added for auth setup w/ env parsing ([440a3a3](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/440a3a30b23207061c3fb7d0838e2dcadb0f714e))
* basic pwa support added ([e95094e](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/e95094e2b081ce5e754e8860cfa367e8b4a5bfc7))
* bookmarks added w/ placeholder data ([d50de64](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/d50de6475f42d020a42eabfaa7e4c501fd63a012))
* bookmarks api integrated ([c0d67b7](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/c0d67b79a0093e8c311f290e5260182d6c97e284))
* bookmarks total count indicator added ([e053f08](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/e053f08c0939005547b194b5435827291b4e07ba))
* bookmarks type filter integrated ([72ea218](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/72ea218465e340b864dcc778783d047be0d55651))
* breadcrumbs added for hierarchy ([084d113](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/084d1135a6d579ecca0da5cb6e2a4b99c86e6d9e))
* breadcrumbs ui added in each bookmarked type ([575469c](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/575469c8711b4e7a0e6d0a0f6abbce36e0ce0e6e))
* card hierarchy breadcrumbs logic added ([df7fd3f](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/df7fd3ff042c20672d6d152cb32915555008d4c4))
* confetti added for correct quiz answer ([b7c5458](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/b7c545871088f71dfc9b24c7fcbf795c481a0b03))
* content view flow added w/ placeholder data & actions ([651d6ba](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/651d6ba5adabd651381adfa7f983d835f5796a4a))
* course list api integrated ([3abac73](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/3abac736bdcaacb98e44f0112c6fdbc6efc72d71))
* drive files added for hierarchy ([cfa18a3](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/cfa18a374998f56669c42c817a2fe80fc3688664))
* error, global-error & not-found pages added w/ basic ui ([a2aa68d](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/a2aa68d17ce76d6aee9e1962be81f3d726ab6807))
* **feedbackApi:** vote and feedback apis added ([2e5d100](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/2e5d100811f4582bf17ac8d64e610687ca4ce5f7))
* framer motion package added for animation ([0970f82](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/0970f82cea0d40fa8fba0a198ab8807b2365681d))
* **getSlides:** getSlides api added to get data from backend ([d64ade7](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/d64ade7fc26846116e5153981a439970c5247c65))
* global search api integrated & refactored command ui ([59a7fd2](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/59a7fd2dd7ba272088ea346a39d6a71064b98540))
* hierarchy apis integrated w/ temp setup ([ce04eb5](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/ce04eb5422fcce300066c22b5752eb6c83af0d2b))
* **initialMessages:** initial messages added to useChat ([f1be20f](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/f1be20fcec30b8125e3f1bbb34ff8c06af83bfdc))
* **initialMessages:** initial messages added to useChat with api data ([560ac71](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/560ac71f75906a323e0d0029d9e0988cab690771))
* **interactions:** interaction functions added to be reused ([02d0946](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/02d094661a8c98043e950ee1f725cb8c0e0b5b2e))
* ipdata ip lookup integrated in onboarding flow ([a42af63](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/a42af63b5c64c2596e7b507a03ba3a4863da5e26))
* **langchain:** lisaai chatbot added with context boundary using langchain ([d0d862f](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/d0d862f710c783f357a3a0fb5222a968e54e24b9))
* **loading:** loading atom added across the app and skeleton in chat ([3cbeba0](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/3cbeba0ff16fe8571c9f4dac4fcc67954ee45800))
* local data based search filters added ([fd281d7](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/fd281d7d0396119a031673fcfa0d43efc8e92dc4))
* onboarding api & ui integrated w/ profile view for interests ([2b8c5c9](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/2b8c5c9fd30a20b3935efd6c0fb5bac436948c79))
* onboarding screen added w/ placeholder data & ui ([90cf0f8](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/90cf0f814ae8673941bc90d1f31a9e5dbe440703))
* page transitions added w/ minor refactoring ([49eaa0c](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/49eaa0c5b02aafb98731f034b26f7c2180039675))
* posthog integrated ([7b7486e](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/7b7486e141c131d09dd173a70afc82ae47665867))
* posthog sample events added ([3958b4c](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/3958b4c4fe1607af14e443f17d95d2c234476739))
* practice questions bookmark api integrated & bookmark flow refactored ([d33f34a](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/d33f34abef6aec99c047472bc498daa9d2dddc64))
* **practiceQuestions:** practice questions get and post apis added ([e82d956](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/e82d956acd621d4fa693e1b16ee9f9593b43fc7c))
* **practiceQuestions:** practice questions using ai added ([23a679d](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/23a679dbcb2b2b3bdb7dbcdef707db7820c33896))
* profile & cover image update api integrated ([e30ded9](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/e30ded9d37a53ea6b8c54a3ce383c96c4eeb7b60))
* profile & profile edit screens added w/ placeholder data & ui ([38a4b37](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/38a4b3799991ff7514ef7e417fdce26b9cf494d5))
* **prompts:** custom toic based prompts added ([a35a2bc](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/a35a2bcd763d0895fc37c4a4b46981427d189b3f))
* **quiz slide:** quiz slide added in ai generated slides ([b5d7234](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/b5d72348f197d117528f84053a4191eefbaa514f))
* recent topics api integrated ([cdbf5c5](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/cdbf5c57c0cad45d6fbea40214884245f65c115b))
* schema based validation user friendly messages added ([d3efb6a](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/d3efb6a6e974152fbe06350a3e5b4423e86d77ed))
* sentry integrated ([a7c2a41](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/a7c2a4146d1658e9aa9c7024eeccc9913e517136))
* suggested topic api integrated ([e888280](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/e8882809e0b89870cfcd399490b06f919dd61a1d))
* topic & resource bookmark api integrated ([5ee7e82](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/5ee7e8216f1f7b3dffc521c289fe839706115e33))
* topic completion info added w/ minor code cleanup ([71e4571](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/71e4571b9a37bbeab5c5dc48738cd7d779967bd6))
* topic details api integrated w/ minor routing and data storing refactoring ([e3f387d](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/e3f387da3e14f469e5c1848df6d91d9f41751050))
* topic resources api integrated & refactored routing for topicView ([0741fe4](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/0741fe4bf014a1add763be44cae5080e82cd2a66))
* **translateAPI:** translation api added in slides & fixed ContentPagination type definition ([29f2c16](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/29f2c1687285bb86eb4eee58172371d716d2961d))
* useChat onError methods added to log errors ([fae9621](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/fae96210a75a3952843c5f78187b106d0501356d))
* user context added for sentry, jam & posthog ([03a7f1f](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/03a7f1f1fdc4852432b2261f0dc8a3001bd5d207))
* user profile api integrated ([5221a3a](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/5221a3acc7853b21add3a97780568b0919a13464))
* user profile api integrated w/ profile view & edit form data ([72c2494](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/72c24946c8003f304ad31692689f25afb55ebc0c))

## 0.0.0 (2024-03-21)


### * Chores

* release flow integrated w/ linter ([515579d](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/515579d62557cf4697386214f69640d59b5632c8))

## [Initial commit from Create Next App](https://github.com/LetsUpgrade-Labs/lisa-ai/commit/01a72a88f8a757b862c96213ac98012605a3eb23) (2024-03-21)
