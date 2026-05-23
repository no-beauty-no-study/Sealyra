# Words that need a collocation in an existing parchment

Each word below appears in a Stage 0 reading article and is **not
an orphan** — the in-app lookup (direct head → family/kin reverse
→ stem → prefix-strip → substring) can reach a parent card. But
the word itself is **not yet a literal entry** in that parent's
`family` or `kin` array, so when the user opens the parchment
they don't see why their click landed there.

What to do with this list:

For each row, paste the trio into GPT:

> Given the parent card head **<parent>** and the reading word
> **<word>** (sample sentence: *<ctx>*), produce one line in the
> existing card format:
>
>     "<word> | <pos> | <english collocation> | <chinese gloss>"
>
> Decide whether the entry belongs in `family` (direct
> inflection / derivative of <parent>) or in `kin` (shares a
> root with <parent>).

Then drop the produced lines into PARCHMENT_CARDS[<parent>].family
or .kin and they'll start linking from reading articles.

The `Path` column shows how the lookup found the parent — use it
to sanity-check whether the anchor is reasonable.  `substring(...)`
matches are the loosest; reject any that don't actually share a
root.

Stats:
- words analysed across all stage 0 articles: **5486**
- has own parchment card (leave alone): **883**
- already a literal family/kin entry: **670**
- true orphans (no anchor, no own card) dropped: **2803**
- needs a collocation written: **1003**


## Chapter 1 (70 words)

| Word | Parent | Path | Hits | Sections | Sample sentence |
|---|---|---|---:|---|---|
| **directly** | `redirect` | stem(direct) | 16 | 1.3, 1.4, 1.5 | It constitutes one undistinguished ember among the hundred billion celestial bodies that inhabit the… |
| **emerged** | `emerge` | stem(emerg) | 16 | 1.6, 2.1, 2.2 | Without that gentle restraint on our axis, the climate would fluctuate violently across the whole pl… |
| **constitutes** | `constitute` | stem(constitute) | 12 | 1.3, 1.6, 4.1 | It constitutes one undistinguished ember among the hundred billion celestial bodies that inhabit the… |
| **civilisation** | `civil` | substring(civil) | 12 | 1.5, 1.7, 2.5 | The sunlight that warms your face is older than human civilisation itself.… |
| **persisted** | `consistent` | stem(persist) | 10 | 1.5, 2.1, 2.2 | On a quiet day the collision merely illuminates the polar sky with shimmering aurorae; on a violent … |
| **sustained** | `sustainable` | stem(sustain) | 9 | 1.2, 3.7, 9.2 | When a giant star has at last consumed the nuclear fuel that had sustained it for billions of years,… |
| **nuclear** | `clear` | substring(clear) | 8 | 1.2, 2.6, 9.49 | When a giant star has at last consumed the nuclear fuel that had sustained it for billions of years,… |
| **moment** | `momentum` | stem-of-family | 7 | 1.1, 2.4, 7.12 | Only after aeons of gradual cooling, as the primordial matter slowly dissipated its inconceivable he… |
| **direction** | `redirect` | stem(direc) | 7 | 1.1, 1.5, 6.3 | That ancient radiance, now stretched and attenuated by the relentless expansion of space, still perm… |
| **ascends** | `ascend` | stem(ascend) | 7 | 1.5, 1.6, 4.2 | Far down inside the Sun, where the temperature ascends into the millions and hydrogen atoms are crus… |
| **crossed** | `crucial` | stem(cross) | 6 | 1.2, 7.11, 8.11 | Around that point hangs an invisible boundary called the event horizon, and once anything has crosse… |
| **standing** | `substantial` | stem(stand) | 6 | 1.4, 4.3, 7.1 | An astronaut who occupies a space station orbiting above the atmosphere returns a few thousandths of… |
| **recovered** | `coverage` | stem(cover) | 6 | 1.6, 2.3, 8.3 | Earth, in its first hours of existence, very nearly endured a catastrophe from which it might never … |
| **oceans** | `oceanography` | stem(ocean) | 6 | 1.6, 2.1, 2.2 | When the new Moon was young it occupied a position so close to Earth that it almost filled half the … |
| **sunlight** | `light` | substring(light) | 5 | 1.5, 2.1, 2.2 | The sunlight that warms your face is older than human civilisation itself.… |
| **civilisations** | `civil` | substring(civil) | 5 | 1.7, 3.7, 6.1 | The universe has endured for so long, and encompasses so many stars and so many planets, that the ga… |
| **satellites** | `satellite` | stem(satellite) | 4 | 1.4, 1.5, 7.3 | That negligible gap sounds like a curiosity until you recall the navigation satellites in orbit over… |
| **minutes** | `diminish` | stem(minute) | 4 | 1.5, 3.3, 3.13 | Once that photon finally breaks free of the surface and enters the vacuum of space, the trip across … |
| **converting** | `avert` | stem(convert) | 4 | 1.5, 4.11, 10.22 | The Sun has maintained this furnace by converting its own mass into pure radiation, second by second… |
| **seasons** | `sea` | stem(season) | 4 | 1.6, 4.10, 9.28 | Then, over hundreds of millions of years, the Moon receded outward and the rotation slowed, until th… |
| **originally** | `aboriginal` | stem(original) | 4 | 1.7, 8.13, 9.13 | A handful among them constitute rough Earth-analogues, occupying just the right interval from their … |
| **contains** | `obtain` | stem(contain) | 4 | 1.7, 4.11, 8.2 | Or, most unsettling of all, perhaps we genuinely constitute the very first to emerge in the cosmos, … |
| **condensed** | `density` | stem(condens) | 3 | 1.1, 1.6, 9.41 | In an epoch so remote that no human concept of time can encompass it, the entirety of the cosmos was… |
| **erupted** | `abrupt` | stem(erupt) | 3 | 1.1, 8.19 | From this incomprehensible compression, the universe erupted outward with such violence that it unde… |
| **signals** | `designate` | stem(signal) | 3 | 1.2, 1.4, 1.5 | Around that point hangs an invisible boundary called the event horizon, and once anything has crosse… |
| **spacecraft** | `space` | substring(space) | 3 | 1.2, 1.4 | If a spacecraft were to plunge inward while a distant observer watched its descent from a safe orbit… |
| **margins** | `marginal` | stem(margin) | 3 | 1.3, 4.5, 9.5 | The constellations we see at night are merely the patterns nearby stars happen to make against the d… |
| **emerges** | `merge` | stem(emerge) | 3 | 1.5, 1.7, 6.5 | Far down inside the Sun, where the temperature ascends into the millions and hydrogen atoms are crus… |
| **storms** | `brainstorm` | stem(storm) | 3 | 1.5, 9.6, 10.8 | Every so often the Sun unleashes a vast storm of charged particles directly at our planet, and when … |
| **generates** | `generate` | stem(generate) | 3 | 1.6, 4.4, 10.20 | Then, over hundreds of millions of years, the Moon receded outward and the rotation slowed, until th… |
| **deliberately** | `liberate` | substring(liberate) | 3 | 1.7, 3.10, 10.31 | Perhaps the older civilisations out there deliberately obscure themselves from beginners like us.… |
| **expanding** | `expand` | stem(expand) | 2 | 1.1, 1.3 | From this incomprehensible compression, the universe erupted outward with such violence that it unde… |
| **devours** | `devour` | stem(devour) | 2 | 1.2, 1.7 | One looms at the heart of almost every galaxy we have ever observed, our own Milky Way included, whe… |
| **accelerating** | `accelerate` | stem(accelerat) | 2 | 1.3, 5.8 | The cosmos as a whole, the data revealed, is not merely expanding but accelerating outward, propelle… |
| **persists** | `consistent` | stem(persist) | 2 | 1.3, 3.3 | The other ninety five per cent persists, for now, as a complete blank.… |
| **accelerates** | `accelerate` | stem(accelerate) | 2 | 1.4 | Nothing in nature can exceed it, and the closer anything accelerates toward that ceiling, the more t… |
| **orbiting** | `orbit` | stem(orbit) | 2 | 1.4, 2.6 | An astronaut who occupies a space station orbiting above the atmosphere returns a few thousandths of… |
| **fluctuates** | `fluctuate` | stem(fluctuate) | 2 | 1.5, 3.6 | Every so often the Sun unleashes a vast storm of charged particles directly at our planet, and when … |
| **reverses** | `versatile` | stem(verse) | 2 | 1.6, 6.1 | The magnetic field that deflects the lethal radiation streaming off the Sun is no fixed buttress: ev… |
| **planets** | `plankton` | stem(planet) | 2 | 1.7 | We have by now catalogued thousands of planets in orbit around distant stars, found by telescopes of… |
| **broadcasting** | `broad` | stem(broadcast) | 2 | 1.7 | The universe has endured for so long, and encompasses so many stars and so many planets, that the ga… |
| **incomprehensible** | `apprehend` | stem(comprehens) | 1 | 1.1 | From this incomprehensible compression, the universe erupted outward with such violence that it unde… |
| **inconceivable** | `conceive` | stem(conceiv) | 1 | 1.1 | Only after aeons of gradual cooling, as the primordial matter slowly dissipated its inconceivable he… |
| **universe's** | `universe` | substring(universe) | 1 | 1.1 | Only after aeons of gradual cooling, as the primordial matter slowly dissipated its inconceivable he… |
| **reference** | `infer` | stem(ference) | 1 | 1.2 | If a spacecraft were to plunge inward while a distant observer watched its descent from a safe orbit… |
| **drifts** | `derive` | stem(drift) | 1 | 1.2 | One looms at the heart of almost every galaxy we have ever observed, our own Milky Way included, whe… |
| **undistinguished** | `distinguish` | stem(distinguish) | 1 | 1.3 | It constitutes one undistinguished ember among the hundred billion celestial bodies that inhabit the… |
| **constellations** | `constellation` | stem(constellation) | 1 | 1.3 | The constellations we see at night are merely the patterns nearby stars happen to make against the d… |
| **nebulae** | `nebula` | substring(nebula) | 1 | 1.3 | The constellations we see at night are merely the patterns nearby stars happen to make against the d… |
| **comets** | `comet` | stem(comet) | 1 | 1.3 | The constellations we see at night are merely the patterns nearby stars happen to make against the d… |
| **orbits** | `orbit` | stem(orbit) | 1 | 1.3 | Something invisible was holding the stars in their orbits, something no instrument astronomers have … |
| **near-light** | `light` | substring(light) | 1 | 1.4 | Imagine a spacecraft that accelerates outward from Earth and cruises for years at near-light velocit… |
| **sounds** | `absurd` | stem(sound) | 1 | 1.4 | That negligible gap sounds like a curiosity until you recall the navigation satellites in orbit over… |
| **scatters** | `scatter` | stem(scatter) | 1 | 1.5 | But the plasma packing the Sun's core is so dense that the new photon cannot propagate straight outw… |
| **breaks** | `breach` | stem(break) | 1 | 1.5 | Once that photon finally breaks free of the surface and enters the vacuum of space, the trip across … |
| **encounters** | `encounter` | stem(encounter) | 1 | 1.5 | Every so often the Sun unleashes a vast storm of charged particles directly at our planet, and when … |
| **oscillates** | `oscillation` | stem(oscillate) | 1 | 1.5 | Every so often the Sun unleashes a vast storm of charged particles directly at our planet, and when … |
| **illuminates** | `illuminate` | stem(luminate) | 1 | 1.5 | On a quiet day the collision merely illuminates the polar sky with shimmering aurorae; on a violent … |
| **aurorae** | `aurora` | substring(aurora) | 1 | 1.5 | On a quiet day the collision merely illuminates the polar sky with shimmering aurorae; on a violent … |
| **disrupts** | `disrupt` | substring(disrupt) | 1 | 1.5 | On a quiet day the collision merely illuminates the polar sky with shimmering aurorae; on a violent … |
| **violently** | `violate` | stem(violent) | 1 | 1.6 | Without that gentle restraint on our axis, the climate would fluctuate violently across the whole pl… |
| **attenuates** | `attenuate` | stem(attenuate) | 1 | 1.6 | The magnetic field that deflects the lethal radiation streaming off the Sun is no fixed buttress: ev… |
| **falters** | `alter` | stem(falter) | 1 | 1.6 | The magnetic field that deflects the lethal radiation streaming off the Sun is no fixed buttress: ev… |
| **migrates** | `mitigate` | stem(migrate) | 1 | 1.6 | The magnetic field that deflects the lethal radiation streaming off the Sun is no fixed buttress: ev… |
| **pointing** | `appoint` | stem(point) | 1 | 1.6 | The magnetic field that deflects the lethal radiation streaming off the Sun is no fixed buttress: ev… |
| **occupying** | `occupy` | stem(occupy) | 1 | 1.7 | A handful among them constitute rough Earth-analogues, occupying just the right interval from their … |
| **encompasses** | `encompass` | substring(encompass) | 1 | 1.7 | The universe has endured for so long, and encompasses so many stars and so many planets, that the ga… |
| **cleverer** | `clever` | stem(clever) | 1 | 1.7 | The universe has endured for so long, and encompasses so many stars and so many planets, that the ga… |
| **unambiguous** | `ambiguous` | stem(ambigu) | 1 | 1.7 | And yet not one signal, not one craft, not one unambiguous trace of another mind has ever manifested… |
| **beginners** | `inner` | substring(inner) | 1 | 1.7 | Perhaps the older civilisations out there deliberately obscure themselves from beginners like us.… |

## Chapter 2 (84 words)

| Word | Parent | Path | Hits | Sections | Sample sentence |
|---|---|---|---:|---|---|
| **generating** | `generate` | stem(generat) | 24 | 2.2, 4.5, 5.1 | Crucially, the volcanoes themselves never paused: across millions of years they kept generating carb… |
| **global** | `globalization` | stem-of-family | 19 | 2.6, 3.12, 3.13 | The impact ejected a curtain of incinerated rock into the upper atmosphere, where it ascended into o… |
| **mammals** | `mammal` | stem(mammal) | 12 | 2.6, 2.7, 4.1 | But a few small mammals had been quietly inhabiting underground burrows, hibernating through the wor… |
| **forests** | `afforestation` | stem(forest) | 10 | 2.4, 2.5, 2.7 | Roughly ninety-six per cent of every marine species on Earth was eradicated, along with the majority… |
| **populations** | `population` | stem(population) | 8 | 2.1, 5.9, 9.7 | Entire populations of anaerobic microbes were eradicated outright by the exhalations of their distan… |
| **record** | `accord` | strip-re | 7 | 2.2, 3.7, 7.5 | Animals of forms so bizarre they appear nearly imaginary suddenly emerged in the fossil record: the … |
| **animals** | `animal` | stem(animal) | 6 | 2.2, 2.5, 3.8 | Animals of forms so bizarre they appear nearly imaginary suddenly emerged in the fossil record: the … |
| **drifted** | `derive` | stem(drift) | 6 | 2.4, 2.5, 3.1 | Long after life had spread across the continents, the continents themselves drifted slowly together.… |
| **humans** | `human` | stem(human) | 6 | 2.6, 7.2, 9.7 | The collision generated an explosion approximately a billion times more energetic than every nuclear… |
| **conditions** | `conditioning` | stem(condition) | 6 | 2.7, 7.2, 9.20 | Across the next sixty million years they accumulated the survival features we now take entirely for … |
| **consuming** | `consume` | stem(consum) | 5 | 2.1, 4.7, 5.8 | For roughly two billion years afterward, life persisted as a microbial film, consuming dissolved car… |
| **giants** | `ant` | stem(giant) | 5 | 2.2, 2.7, 7.5 | Here is the strange consolation of being human: trace your own lineage backwards far enough and you … |
| **ecological** | `logical` | substring(logical) | 5 | 2.5, 5.2, 5.4 | These were the dinosaurs, and they encompassed every conceivable ecological niche so quickly that no… |
| **predators** | `prey` | stem(dator) | 5 | 2.5, 2.6, 3.3 | Giant predators ascended to the top of the food chain on land.… |
| **whales** | `whale` | stem(whale) | 5 | 2.7, 4.2, 4.9 | They diverged into whales beneath the surface of every ocean, into bats articulating leathery wings … |
| **articulating** | `articulate` | stem(articulat) | 5 | 2.7, 9.9, 9.33 | They diverged into whales beneath the surface of every ocean, into bats articulating leathery wings … |
| **seawater** | `water` | substring(water) | 4 | 2.1, 2.4, 8.6 | The released oxygen accumulated relentlessly in the seawater and then in the atmosphere, and here ar… |
| **cleared** | `clarify` | stem(clear) | 4 | 2.1, 2.4, 2.6 | This Great Oxygenation Event constituted the first mass extinction the planet had ever endured, and … |
| **plates** | `latent` | stem(plate) | 4 | 2.2, 2.5, 4.2 | Animals of forms so bizarre they appear nearly imaginary suddenly emerged in the fossil record: the … |
| **continents** | `continuous` | stem(continent) | 4 | 2.4, 6.5, 9.42 | Long after life had spread across the continents, the continents themselves drifted slowly together.… |
| **completely** | `accomplish` | stem(complete) | 4 | 2.4, 2.6, 9.29 | The few species that managed to withstand the disaster received a stage that had been almost complet… |
| **primates** | `primate` | stem(primate) | 4 | 2.7, 3.1, 3.4 | One particularly modest branch of these mammals ascended into the canopies of tropical forests and c… |
| **sufficiently** | `insufficiency` | stem(sufficient) | 3 | 2.1, 9.19, 10.1 | Beneath a roiling atmosphere of steam and corrosive gases, the crust constituted a turbulent ocean o… |
| **vertebrates** | `vertebrate` | stem(vertebrate) | 3 | 2.3, 2.4, 8.2 | The land above was a barren expanse, baked by ultraviolet radiation and devoid of the organic matter… |
| **burrowed** | `burrow` | stem(burrow) | 3 | 2.3, 5.2, 9.48 | Every tetrapod that has ever walked, jumped, flown, or burrowed, from the heaviest elephant down to … |
| **shifted** | `shift` | stem(shift) | 3 | 2.4, 3.5, 10.36 | The eroding topography of the supercontinent exposed bare strata of sediment to relentless acid rain… |
| **successful** | `access` | stem(success) | 3 | 2.5, 4.8, 9.28 | One particular line of reptiles, modest in size at the outset, evolved across the next thirty millio… |
| **directions** | `direct` | substring(direct) | 3 | 2.5, 5.5, 10.26 | That is how each modern continent eventually arrived at such a divergent collection of native animal… |
| **underground** | `ground` | substring(ground) | 3 | 2.6, 7.10 | But a few small mammals had been quietly inhabiting underground burrows, hibernating through the wor… |
| **offspring** | `spring` | substring(spring) | 3 | 2.7, 5.2, 8.22 | Across the next sixty million years they accumulated the survival features we now take entirely for … |
| **clouds** | `cloud` | stem(cloud) | 2 | 2.1, 7.8 | Once the surface had finally hardened, the dense clouds above released a downpour that endured, by s… |
| **estimates** | `estimate` | stem(estimate) | 2 | 2.1, 9.16 | Once the surface had finally hardened, the dense clouds above released a downpour that endured, by s… |
| **molecules** | `molecule` | stem(molecule) | 2 | 2.1, 10.37 | Deep below those oceans, hydrothermal vents emerged along the volcanic seams in the crust, expelling… |
| **arrives** | `rival` | stem(arrive) | 2 | 2.1, 9.55 | The released oxygen accumulated relentlessly in the seawater and then in the atmosphere, and here ar… |
| **breath** | `breathing` | stem-of-family | 2 | 2.1, 8.2 | The released oxygen accumulated relentlessly in the seawater and then in the atmosphere, and here ar… |
| **depends** | `independent` | stem(depend) | 2 | 2.1, 10.34 | The released oxygen accumulated relentlessly in the seawater and then in the atmosphere, and here ar… |
| **poisonous** | `poison` | stem(poison) | 2 | 2.1, 7.4 | The released oxygen accumulated relentlessly in the seawater and then in the atmosphere, and here ar… |
| **continued** | `continuous` | stem(continu) | 2 | 2.2, 9.23 | Life persisted, but only in narrow pockets near hydrothermal vents on the seafloor, where heat conti… |
| **volcanoes** | `volcano` | substring(volcano) | 2 | 2.2, 7.1 | Crucially, the volcanoes themselves never paused: across millions of years they kept generating carb… |
| **traces** | `portrait` | stem(trace) | 2 | 2.3, 6.5 | Every tetrapod that has ever walked, jumped, flown, or burrowed, from the heaviest elephant down to … |
| **dimensions** | `immense` | stem(dimension) | 2 | 2.3, 9.2 | The atmosphere of that era was thick with oxygen, and dragonflies, encountering no predator capable … |
| **compressed** | `compressive` | stem(compress) | 2 | 2.4, 3.2 | The coastline, suddenly compressed into one continuous loop, dwindled drastically, and the vast inte… |
| **discharging** | `charged` | stem(charg) | 2 | 2.4, 7.3 | Across what is now Siberia, fissures opened in the crust and persisted for almost a million years, e… |
| **displace** | `replace` | stem(place) | 2 | 2.5, 10.36 | These were the dinosaurs, and they encompassed every conceivable ecological niche so quickly that no… |
| **transporting** | `support` | stem(transport) | 2 | 2.5, 3.8 | That is how each modern continent eventually arrived at such a divergent collection of native animal… |
| **inhabiting** | `exhibit` | stem(habit) | 2 | 2.6, 3.1 | But a few small mammals had been quietly inhabiting underground burrows, hibernating through the wor… |
| **diverged** | `diverge` | stem(diverg) | 2 | 2.7, 5.3 | They diverged into whales beneath the surface of every ocean, into bats articulating leathery wings … |
| **patiently** | `compassion` | stem(patient) | 2 | 2.7, 8.23 | They diverged into whales beneath the surface of every ocean, into bats articulating leathery wings … |
| **branches** | `ranch` | substring(ranch) | 2 | 2.7, 3.4 | Life among the branches demands precision: to leap from one bough to the next without missing, the b… |
| **demands** | `demand` | stem(demand) | 2 | 2.7, 10.22 | Life among the branches demands precision: to leap from one bough to the next without missing, the b… |
| **demanded** | `demand` | stem(demand) | 2 | 2.7, 7.9 | The brain demanded by all this manipulation expanded in size.… |
| **sentences** | `assent` | stem(sentence) | 2 | 2.7, 10.32 | And from a single dwindling population of African australopithecines, one species eventually emerged… |
| **minerals** | `undermine` | stem(mineral) | 1 | 2.1 | Deep below those oceans, hydrothermal vents emerged along the volcanic seams in the crust, expelling… |
| **profoundly** | `found` | stem(profound) | 1 | 2.1 | The released oxygen accumulated relentlessly in the seawater and then in the atmosphere, and here ar… |
| **microbes** | `micronutrient` | stem(microbe) | 1 | 2.1 | Entire populations of anaerobic microbes were eradicated outright by the exhalations of their distan… |
| **oxygenation** | `oxygen` | substring(oxygen) | 1 | 2.1 | This Great Oxygenation Event constituted the first mass extinction the planet had ever endured, and … |
| **segmented** | `segmentation` | stem(segment) | 1 | 2.2 | Animals of forms so bizarre they appear nearly imaginary suddenly emerged in the fossil record: the … |
| **trilobites** | `trilobite` | stem(trilobite) | 1 | 2.2 | Animals of forms so bizarre they appear nearly imaginary suddenly emerged in the fossil record: the … |
| **breathable** | `breathing` | stem(breath) | 1 | 2.3 | Plants ascended onto the shore first, slowly, awkwardly, like reluctant tourists at a hostile resort… |
| **lobe-finned** | `finned` | substring(finned) | 1 | 2.3 | Then a particular lobe-finned fish named Tiktaalik, recovered from the Devonian sediments of arctic … |
| **sediments** | `sediment` | stem(sediment) | 1 | 2.3 | Then a particular lobe-finned fish named Tiktaalik, recovered from the Devonian sediments of arctic … |
| **mudflats** | `mudflat` | stem(mudflat) | 1 | 2.3 | Tiktaalik almost certainly utilised those primitive limbs to crawl through tidal mudflats and ambush… |
| **oxygen-rich** | `oxygen` | substring(oxygen) | 1 | 2.3 | Tiktaalik almost certainly utilised those primitive limbs to crawl through tidal mudflats and ambush… |
| **amphibians** | `amphibian` | stem(amphibian) | 1 | 2.3 | Its descendants, with the kind of patience only evolution can demonstrate, traded gills for lungs, r… |
| **dragonflies** | `dragon` | substring(dragon) | 1 | 2.3 | The atmosphere of that era was thick with oxygen, and dragonflies, encountering no predator capable … |
| **catching** | `catchment` | stem(catch) | 1 | 2.3 | The atmosphere of that era was thick with oxygen, and dragonflies, encountering no predator capable … |
| **raptors** | `raptor` | stem(raptor) | 1 | 2.3 | Their wingspans reached the size of modern raptors.… |
| **discovering** | `coverage` | stem(cover) | 1 | 2.3 | Imagine swatting at an insect and discovering it is the size of an eagle.… |
| **fissures** | `ensure` | stem(fissure) | 1 | 2.4 | Across what is now Siberia, fissures opened in the crust and persisted for almost a million years, e… |
| **catastrophic** | `trophic` | substring(trophic) | 1 | 2.4 | The eroding topography of the supercontinent exposed bare strata of sediment to relentless acid rain… |
| **tetrapods** | `tetrapod` | stem(tetrapod) | 1 | 2.5 | One particular line of reptiles, modest in size at the outset, evolved across the next thirty millio… |
| **sauropods** | `sauropod` | stem(sauropod) | 1 | 2.5 | Long-necked sauropods consumed the canopies of entire forests in a single afternoon.… |
| **pterosaurs** | `pterosaur` | stem(pterosaur) | 1 | 2.5 | Pterosaurs, technically not dinosaurs but their close kin, articulated immense leathery wings and pa… |
| **plesiosaurs** | `plesiosaur` | stem(plesiosaur) | 1 | 2.5 | Plesiosaurs occupied the seas, propelled by paddled limbs and capable of seizing fish at depths most… |
| **separating** | `separate` | stem(separat) | 1 | 2.5 | That is how each modern continent eventually arrived at such a divergent collection of native animal… |
| **lineages** | `alienation` | stem(lineage) | 1 | 2.5 | That is how each modern continent eventually arrived at such a divergent collection of native animal… |
| **ejected** | `adjacent` | stem(eject) | 1 | 2.6 | The impact ejected a curtain of incinerated rock into the upper atmosphere, where it ascended into o… |
| **hailstorm** | `storm` | substring(storm) | 1 | 2.6 | The impact ejected a curtain of incinerated rock into the upper atmosphere, where it ascended into o… |
| **tsunamis** | `tsunami` | stem(tsunami) | 1 | 2.6 | Tsunamis dispersed outward from the impact site, vast walls of water that eroded coastlines on every… |
| **burrows** | `burrow` | stem(burrow) | 1 | 2.6 | But a few small mammals had been quietly inhabiting underground burrows, hibernating through the wor… |
| **features** | `feasible` | stem(feature) | 1 | 2.7 | Across the next sixty million years they accumulated the survival features we now take entirely for … |
| **accurately** | `cure` | stem(accurate) | 1 | 2.7 | Life among the branches demands precision: to leap from one bough to the next without missing, the b… |
| **fingers** | `linger` | stem(finger) | 1 | 2.7 | Life among the branches demands precision: to leap from one bough to the next without missing, the b… |
| **australopithecines** | `australopithecine` | stem(australopithecine) | 1 | 2.7 | And from a single dwindling population of African australopithecines, one species eventually emerged… |

## Chapter 3 (135 words)

| Word | Parent | Path | Hits | Sections | Sample sentence |
|---|---|---|---:|---|---|
| **produced** | `produce` | stem(produc) | 21 | 3.1, 3.11, 5.7 | With no large predator ever managing to colonise the island, the early primates left there were free… |
| **developed** | `redevelopment` | stem(develop) | 17 | 3.2, 3.4, 3.10 | She was an australopithecine, an early hominid whose anatomy demonstrated that bipedal walking had d… |
| **government** | `governance` | stem(govern) | 10 | 3.12, 5.8, 8.7 | In nineteen seventies Nigeria, the saxophonist Fela Kuti fused traditional Yoruba percussion with Am… |
| **agricultural** | `cultural` | substring(cultural) | 9 | 3.7, 6.1, 8.18 | This dependable cycle of inundation generated the agricultural surplus that sustained one of humanit… |
| **generations** | `generate` | stem(generation) | 9 | 3.7, 3.13, 8.6 | The pharaoh, who functioned as both king and living god, mobilised entire generations of stonemasons… |
| **accumulating** | `accumulate` | stem(accumulat) | 8 | 3.1, 4.9, 8.22 | The baobab simply enlarged its trunk into a living water tank capable of accumulating enough moistur… |
| **abandoned** | `abandonment` | stem(abandon) | 8 | 3.3, 7.8, 9.22 | Human communities still living on the African savannah occupy the same food chain as their unspeakin… |
| **northward** | `north` | substring(north) | 8 | 3.5, 5.1, 8.1 | Ten thousand years ago, the region we now call the Sahara was a sprawling network of lakes and grass… |
| **geological** | `logical` | substring(logical) | 7 | 3.1, 3.5, 5.1 | Eighty-eight million years of geological solitude generated a continent in miniature, populated by c… |
| **creatures** | `concrete` | stem(creature) | 6 | 3.1, 4.2, 9.21 | Eighty-eight million years of geological solitude generated a continent in miniature, populated by c… |
| **inhabitants** | `inhabit` | stem(habitant) | 6 | 3.8, 3.10, 6.3 | At its peak Timbuktu accommodated nearly a hundred thousand inhabitants and amassed a library repute… |
| **manuscripts** | `manifest` | stem(manuscript) | 6 | 3.8, 9.5, 9.9 | At its peak Timbuktu accommodated nearly a hundred thousand inhabitants and amassed a library repute… |
| **continues** | `continuous` | stem(continue) | 5 | 3.2, 3.13, 5.2 | A considerable fissure called the East African Rift opened in the crust and continues to expand to t… |
| **designed** | `designate` | stem(design) | 5 | 3.6, 9.17, 9.26 | Even the cities of the continent that no human ever designed prove cognitively impressive: army ants… |
| **systematically** | `system` | substring(system) | 5 | 3.10, 9.10, 9.49 | In what is now Namibia, the German colonial authority herded the Herero people into the Kalahari and… |
| **successive** | `access` | stem(success) | 4 | 3.2, 8.12, 9.1 | As volcanic ash from each successive eruption settled across the rift, it buried whatever had been l… |
| **paintings** | `painting` | stem(painting) | 4 | 3.5, 9.7, 9.47 | Ten thousand years ago, the region we now call the Sahara was a sprawling network of lakes and grass… |
| **seasonal** | `sea` | stem(season) | 4 | 3.7, 8.1, 8.23 | Egyptian scribes also pioneered an early cartography of the river, charting every channel and season… |
| **functioned** | `function` | stem(function) | 4 | 3.7, 3.13, 8.12 | The pharaoh, who functioned as both king and living god, mobilised entire generations of stonemasons… |
| **operations** | `cooperate` | stem(operation) | 4 | 3.7, 10.23, 10.36 | Egyptian scribes devised hieroglyphs to record harvests, taxes, decrees, and prayers, encoding the o… |
| **producing** | `produce` | stem(produc) | 4 | 3.7, 10.22, 10.36 | Embalmers extracted the internal organs of the dead and preserved the body in resin and natron salt,… |
| **deposited** | `composite` | stem(deposit) | 4 | 3.7, 5.7, 8.15 | An elaborate guide to the underworld, the Book of the Dead, was deposited with each corpse to instru… |
| **beings** | `well-being` | stem(being) | 4 | 3.9, 5.5, 6.5 | European ships began calling regularly at the West African coast from the late fifteenth century, ex… |
| **prisoners** | `prison` | substring(prison) | 4 | 3.9, 5.7, 10.19 | Several coastal African kingdoms quickly perceived that capturing neighbours and exchanging them wit… |
| **inflicted** | `conflict` | stem(flict) | 4 | 3.9, 3.13, 9.43 | The wound was not inflicted only by the foreign ships; it was inflicted, as every honest historian e… |
| **powers** | `power` | stem(power) | 4 | 3.10, 9.27, 9.51 | At the end of the nineteenth century the European powers gathered around a single map in Berlin and … |
| **spiritual** | `ritual` | substring(ritual) | 4 | 3.12, 8.9, 9.15 | The Jamaican Bob Marley, having traced his own rhythm back to West Africa, declared the continent th… |
| **produces** | `productive` | stem(produce) | 4 | 3.14, 8.1, 8.7 | In Nigeria, the Nollywood film industry currently produces more films per year than Hollywood, ranki… |
| **extracted** | `abstract` | stem(extract) | 3 | 3.2, 3.7, 4.8 | In nineteen seventy-four, palaeoanthropologists excavating one such ash bed in the Afar region of Et… |
| **perceiving** | `perceive` | stem(perceiv) | 3 | 3.3, 9.3, 10.18 | Giraffes browse the upper canopy of the acacia, perceiving distant predators several minutes before … |
| **closely** | `conclude` | stem(close) | 3 | 3.4, 7.6, 10.36 | Three closely related apes now share that vast green canopy.… |
| **chimpanzees** | `chimpanzee` | stem(chimpanzee) | 3 | 3.4, 3.6 | Chimpanzees, our nearest cousin by genetic measure, live in restless political troops in which an al… |
| **questions** | `conquest` | stem(question) | 3 | 3.6, 9.3, 10.22 | An African grey parrot named Alex mastered three hundred English words and articulated genuine quest… |
| **northeastern** | `north` | substring(north) | 3 | 3.7, 5.9, 10.27 | Once every summer, the great river that traverses northeastern Africa flooded reliably across its lo… |
| **scribes** | `inscription` | stem(scribe) | 3 | 3.7, 9.5 | Egyptian scribes also pioneered an early cartography of the river, charting every channel and season… |
| **pyramids** | `pyramid` | stem(pyramid) | 3 | 3.7, 9.43, 10.2 | The pharaoh, who functioned as both king and living god, mobilised entire generations of stonemasons… |
| **sugarcane** | `sugar` | substring(sugar) | 3 | 3.9, 5.8, 6.5 | Across four centuries this transatlantic slave trade transported somewhere between ten and twelve mi… |
| **chains** | `chain` | stem(chain) | 3 | 3.9, 3.12, 5.7 | The demographic and social fabric of West Africa fractured under the constant haemorrhage of its you… |
| **groups** | `intergroup` | stem(group) | 3 | 3.11, 3.13, 10.27 | Across the middle of the twentieth century, almost every African colony achieved nominal independenc… |
| **wounds** | `vulnerable` | stem(wound) | 3 | 3.13, 8.5 | Some wounds inflicted on Africa in the late twentieth century have refused to close on schedule.… |
| **colonise** | `colonization` | stem(colon) | 2 | 3.1, 5.5 | With no large predator ever managing to colonise the island, the early primates left there were free… |
| **alliances** | `liable` | stem(alliance) | 2 | 3.4, 10.3 | Chimpanzees, our nearest cousin by genetic measure, live in restless political troops in which an al… |
| **organise** | `organic` | stem(organ) | 2 | 3.4, 9.54 | Three apes, each genetically almost identical to the others, yet each demonstrates a radically disti… |
| **reliably** | `liable` | strip-re | 2 | 3.5, 3.7 | Ten thousand years ago, the region we now call the Sahara was a sprawling network of lakes and grass… |
| **rivers** | `derive` | stem(river) | 2 | 3.5, 10.36 | Ten thousand years ago, the region we now call the Sahara was a sprawling network of lakes and grass… |
| **cognitively** | `cognitive` | stem(cognit) | 2 | 3.6 | The fauna south of the Sahara turn out to be considerably more cognitively sophisticated than the ol… |
| **spontaneously** | `spontaneous` | stem(spontane) | 2 | 3.6, 9.27 | An African grey parrot named Alex mastered three hundred English words and articulated genuine quest… |
| **elephants** | `ant` | stem(elephant) | 2 | 3.6, 6.3 | An African grey parrot named Alex mastered three hundred English words and articulated genuine quest… |
| **harvests** | `harvest` | stem(harvest) | 2 | 3.7, 8.19 | Egyptian scribes devised hieroglyphs to record harvests, taxes, decrees, and prayers, encoding the o… |
| **organs** | `organic` | stem(organ) | 2 | 3.7, 8.3 | Embalmers extracted the internal organs of the dead and preserved the body in resin and natron salt,… |
| **scholars** | `scholar` | stem(scholar) | 2 | 3.8, 9.10 | Scholars from across the Islamic world accompanied the trade and accumulated in the city's three pri… |
| **traveller** | `travel` | substring(travel) | 2 | 3.8, 8.15 | When the first European traveller finally reached Timbuktu in the early nineteenth century he found … |
| **chests** | `chest` | stem(chest) | 2 | 3.8 | They had been concealed in private wooden chests by descendants who would rather hide their inherita… |
| **firearms** | `ignite` | stem(firearm) | 2 | 3.9, 7.9 | Several coastal African kingdoms quickly perceived that capturing neighbours and exchanging them wit… |
| **plantations** | `ion` | stem(plantation) | 2 | 3.9, 6.5 | Across four centuries this transatlantic slave trade transported somewhere between ten and twelve mi… |
| **poisoned** | `poison` | stem(poison) | 2 | 3.10, 9.4 | In what is now Namibia, the German colonial authority herded the Herero people into the Kalahari and… |
| **executing** | `executive` | stem(execut) | 2 | 3.10, 8.7 | In what is now Namibia, the German colonial authority herded the Herero people into the Kalahari and… |
| **contradictions** | `contradict` | stem(contradiction) | 2 | 3.10, 9.35 | The borders the Europeans drew that afternoon still hold today, decades after independence, with all… |
| **empires** | `empirical` | stem(empire) | 2 | 3.10, 10.25 | The map outlived the empires that drew it.… |
| **reserves** | `preserve` | stem(serve) | 2 | 3.11, 8.18 | South Africa presented the starkest case: a ruling white minority enforced a legal system called apa… |
| **imprisoned** | `prison` | stem(prison) | 2 | 3.11, 9.32 | Nelson Mandela, a young lawyer and political organiser, was imprisoned in nineteen sixty-four for re… |
| **transition** | `transit` | substring(transit) | 2 | 3.11, 8.23 | As president, he chose to forgive rather than retaliate, supervising a peaceful transition of power … |
| **improbable** | `probe` | strip-im | 2 | 3.11, 9.5 | It remains one of the most improbable political transitions of the twentieth century.… |
| **orphans** | `orphan` | stem(orphan) | 2 | 3.13 | Almost simultaneously, the human immunodeficiency virus migrated out of the central African rainfore… |
| **phones** | `phonetics` | stem(phone) | 2 | 3.14 | The country chose the unlikely path of digital governance: the entire territory was wired with fibre… |
| **parents** | `apparent` | stem(parent) | 2 | 3.14, 8.22 | And in Malawi, a fourteen-year-old boy named William Kamkwamba built a fully functional windmill fro… |
| **lemurs** | `lemur` | stem(lemur) | 1 | 3.1 | With no large predator ever managing to colonise the island, the early primates left there were free… |
| **monkeys** | `monkey` | stem(monkey) | 1 | 3.1 | With no large predator ever managing to colonise the island, the early primates left there were free… |
| **enlarged** | `large` | substring(large) | 1 | 3.1 | The baobab simply enlarged its trunk into a living water tank capable of accumulating enough moistur… |
| **seventy-four** | `event` | substring(event) | 1 | 3.2 | In nineteen seventy-four, palaeoanthropologists excavating one such ash bed in the Afar region of Et… |
| **palaeoanthropologists** | `palaeoanthropologist` | stem(palaeoanthropologist) | 1 | 3.2 | In nineteen seventy-four, palaeoanthropologists excavating one such ash bed in the Afar region of Et… |
| **climbed** | `climax` | stem(climb) | 1 | 3.2 | In nineteen seventy-four, palaeoanthropologists excavating one such ash bed in the Afar region of Et… |
| **emigration** | `migration` | substring(migration) | 1 | 3.3 | Lucy's descendants, after roughly two million years of slow refinement, commenced the long emigratio… |
| **unspeaking** | `peak` | stem(speak) | 1 | 3.3 | Human communities still living on the African savannah occupy the same food chain as their unspeakin… |
| **seasonally** | `season` | substring(season) | 1 | 3.3 | Human communities still living on the African savannah occupy the same food chain as their unspeakin… |
| **prides** | `pride` | stem(pride) | 1 | 3.3 | Lions, the heaviest cats on the planet, dominate the upper level of that food chain, hunting in coor… |
| **giraffes** | `giraffe` | stem(giraffe) | 1 | 3.3 | Giraffes browse the upper canopy of the acacia, perceiving distant predators several minutes before … |
| **zebras** | `zebra` | stem(zebra) | 1 | 3.3 | Zebras assemble in striped multitudes whose moving patterns confuse the visual processing of pursuin… |
| **processing** | `access` | stem(process) | 1 | 3.3 | Zebras assemble in striped multitudes whose moving patterns confuse the visual processing of pursuin… |
| **vultures** | `vulture` | stem(vulture) | 1 | 3.3 | Vultures circle above the entire system, scavengers whose acidic stomachs can devour rotting carcass… |
| **scavengers** | `scavenger` | stem(scavenger) | 1 | 3.3 | Vultures circle above the entire system, scavengers whose acidic stomachs can devour rotting carcass… |
| **carcasses** | `carcass` | substring(carcass) | 1 | 3.3 | Vultures circle above the entire system, scavengers whose acidic stomachs can devour rotting carcass… |
| **wandered** | `erratic` | stem(wander) | 1 | 3.4 | While one branch of African primates wandered out across the world, several other branches stayed in… |
| **troops** | `troop` | stem(troop) | 1 | 3.4 | Chimpanzees, our nearest cousin by genetic measure, live in restless political troops in which an al… |
| **bonobos** | `bonobo` | stem(bonobo) | 1 | 3.4 | Bonobos, who differ from chimpanzees only slightly in anatomy, have devised an utterly different sol… |
| **gorillas** | `gorilla` | stem(gorilla) | 1 | 3.4 | Gorillas, the largest of the three and gentle vegetarians, live in quiet mountain harems guided by a… |
| **harems** | `harem` | stem(harem) | 1 | 3.4 | Gorillas, the largest of the three and gentle vegetarians, live in quiet mountain harems guided by a… |
| **silverback** | `silver` | substring(silver) | 1 | 3.4 | Gorillas, the largest of the three and gentle vegetarians, live in quiet mountain harems guided by a… |
| **genetically** | `genome` | stem(genet) | 1 | 3.4 | Three apes, each genetically almost identical to the others, yet each demonstrates a radically disti… |
| **demonstrates** | `demonstrate` | stem(demonstrate) | 1 | 3.4 | Three apes, each genetically almost identical to the others, yet each demonstrates a radically disti… |
| **sprawling** | `disperse` | stem(sprawl) | 1 | 3.5 | Ten thousand years ago, the region we now call the Sahara was a sprawling network of lakes and grass… |
| **crocodiles** | `crocodile` | stem(crocodile) | 1 | 3.5 | Beneath today's dunes, the bones of crocodiles and turtles are still being excavated from the dried … |
| **turtles** | `turtle` | stem(turtle) | 1 | 3.5 | Beneath today's dunes, the bones of crocodiles and turtles are still being excavated from the dried … |
| **sweeter** | `sweet` | stem(sweet) | 1 | 3.6 | Chimpanzees in laboratory tasks throw food back at experimenters when they observe another chimp rec… |
| **exhibiting** | `exhibit` | stem(exhibit) | 1 | 3.6 | Chimpanzees in laboratory tasks throw food back at experimenters when they observe another chimp rec… |
| **unfairness** | `fair` | strip-un | 1 | 3.6 | Chimpanzees in laboratory tasks throw food back at experimenters when they observe another chimp rec… |
| **embarrassing** | `barren` | stem(embarrass) | 1 | 3.6 | Chimpanzees in laboratory tasks throw food back at experimenters when they observe another chimp rec… |
| **impressive** | `express` | stem(press) | 1 | 3.6 | Even the cities of the continent that no human ever designed prove cognitively impressive: army ants… |
| **mounds** | `mound` | stem(mound) | 1 | 3.6 | Even the cities of the continent that no human ever designed prove cognitively impressive: army ants… |
| **shafts** | `shaft` | stem(shaft) | 1 | 3.6 | Even the cities of the continent that no human ever designed prove cognitively impressive: army ants… |
| **coordinating** | `coordinate` | stem(coordinat) | 1 | 3.6 | Even the cities of the continent that no human ever designed prove cognitively impressive: army ants… |
| **depositing** | `composite` | stem(deposit) | 1 | 3.7 | Once every summer, the great river that traverses northeastern Africa flooded reliably across its lo… |
| **dependable** | `independent` | stem(depend) | 1 | 3.7 | This dependable cycle of inundation generated the agricultural surplus that sustained one of humanit… |
| **humanity's** | `human` | substring(human) | 1 | 3.7 | This dependable cycle of inundation generated the agricultural surplus that sustained one of humanit… |
| **stonemasons** | `stonemason` | stem(stonemason) | 1 | 3.7 | The pharaoh, who functioned as both king and living god, mobilised entire generations of stonemasons… |
| **courses** | `resource` | stem(course) | 1 | 3.7 | The pharaoh, who functioned as both king and living god, mobilised entire generations of stonemasons… |
| **hieroglyphs** | `glyph` | substring(glyph) | 1 | 3.7 | Egyptian scribes devised hieroglyphs to record harvests, taxes, decrees, and prayers, encoding the o… |
| **decrees** | `decree` | stem(decree) | 1 | 3.7 | Egyptian scribes devised hieroglyphs to record harvests, taxes, decrees, and prayers, encoding the o… |
| **prayers** | `prey` | stem(prayer) | 1 | 3.7 | Egyptian scribes devised hieroglyphs to record harvests, taxes, decrees, and prayers, encoding the o… |
| **embalmers** | `embalmer` | stem(embalmer) | 1 | 3.7 | Embalmers extracted the internal organs of the dead and preserved the body in resin and natron salt,… |
| **caravans** | `advance` | stem(caravan) | 1 | 3.8 | Camel caravans, each comprising several thousand animals, traversed the desert in convoys, transport… |
| **convoys** | `convey` | stem(convoy) | 1 | 3.8 | Camel caravans, each comprising several thousand animals, traversed the desert in convoys, transport… |
| **mosques** | `mosque` | stem(mosque) | 1 | 3.8 | Scholars from across the Islamic world accompanied the trade and accumulated in the city's three pri… |
| **transported** | `support` | stem(transport) | 1 | 3.9 | Across four centuries this transatlantic slave trade transported somewhere between ten and twelve mi… |
| **fractured** | `fracture` | substring(fracture) | 1 | 3.9 | The demographic and social fabric of West Africa fractured under the constant haemorrhage of its you… |
| **aftershock** | `shock` | substring(shock) | 1 | 3.9 | The whole continent is still absorbing the aftershock.… |
| **ignoring** | `ignore` | stem(ignor) | 1 | 3.10 | At the end of the nineteenth century the European powers gathered around a single map in Berlin and … |
| **frontiers** | `confront` | stem(frontier) | 1 | 3.10 | At the end of the nineteenth century the European powers gathered around a single map in Berlin and … |
| **impositions** | `composite` | stem(position) | 1 | 3.10 | The lines they drew constituted one of the most arbitrary administrative impositions in recorded his… |
| **seventy-two** | `event` | substring(event) | 1 | 3.11 | Nelson Mandela, a young lawyer and political organiser, was imprisoned in nineteen sixty-four for re… |
| **transitions** | `transit` | substring(transit) | 1 | 3.11 | It remains one of the most improbable political transitions of the twentieth century.… |
| **reflected** | `flexible` | stem(flect) | 1 | 3.12 | The rhythmic patterns enslaved Africans carried into the holds of the slave ships eventually transfo… |
| **seventies** | `event` | substring(event) | 1 | 3.12 | In nineteen seventies Nigeria, the saxophonist Fela Kuti fused traditional Yoruba percussion with Am… |
| **defines** | `finalize` | stem(define) | 1 | 3.12 | The beat that left the continent in chains four centuries ago has returned in triumph, and Africa no… |
| **supplying** | `supply` | stem(supply) | 1 | 3.12 | The beat that left the continent in chains four centuries ago has returned in triumph, and Africa no… |
| **wielding** | `unwieldy` | stem(wield) | 1 | 3.13 | Independence inherited the artificial division, and in nineteen ninety-four nearly a million Tutsi a… |
| **machetes** | `machete` | stem(machete) | 1 | 3.13 | Independence inherited the artificial division, and in nineteen ninety-four nearly a million Tutsi a… |
| **erupts** | `abrupt` | stem(erupt) | 1 | 3.13 | Malaria continues to terminate the life of a child somewhere on the continent every two minutes, and… |
| **genocides** | `genocide` | stem(genocide) | 1 | 3.13 | The genocides, the epidemics, and the orphans together comprise one of the largest unhealed wounds i… |
| **epidemics** | `epidemic` | stem(epidemic) | 1 | 3.13 | The genocides, the epidemics, and the orphans together comprise one of the largest unhealed wounds i… |
| **hospitals** | `hostile` | stem(hospital) | 1 | 3.14 | The country chose the unlikely path of digital governance: the entire territory was wired with fibre… |
| **accounts** | `encounter` | stem(account) | 1 | 3.14 | Across the border in Kenya, the mobile-money service called M-Pesa allows farmers without bank accou… |
| **old-fashioned** | `fashion` | substring(fashion) | 1 | 3.14 | Across the border in Kenya, the mobile-money service called M-Pesa allows farmers without bank accou… |
| **currently** | `concur` | stem(current) | 1 | 3.14 | In Nigeria, the Nollywood film industry currently produces more films per year than Hollywood, ranki… |
| **second-largest** | `large` | substring(large) | 1 | 3.14 | In Nigeria, the Nollywood film industry currently produces more films per year than Hollywood, ranki… |

## Chapter 4 (60 words)

| Word | Parent | Path | Hits | Sections | Sample sentence |
|---|---|---|---:|---|---|
| **constructed** | `construe` | stem(construct) | 17 | 4.10, 5.8, 5.9 | The Inuit of the Arctic constructed shelters from compacted snow bricks cut and stacked into a domed… |
| **demolished** | `abolish` | stem(demolish) | 10 | 4.6, 8.18, 9.12 | The British captain Scott, by contrast, insisted on dragging ponies and motor sledges across terrain… |
| **demonstrating** | `demonstrate` | stem(demonstrat) | 7 | 4.5, 8.6, 9.16 | The Antarctic midge therefore constitutes the lower limit of complex terrestrial life on the planet,… |
| **trained** | `restrain` | stem(train) | 7 | 4.6, 7.7, 9.8 | The Norwegian explorer Amundsen prepared meticulously: sled dogs trained from infancy, a route surve… |
| **discovered** | `coverage` | stem(cover) | 7 | 4.8, 7.1, 9.11 | The same scientists discovered, through routine monitoring, that the ozone layer above the continent… |
| **drifting** | `derive` | stem(drift) | 6 | 4.7, 4.9, 6.4 | His ship Endurance was caught in pack ice before it ever reached the coast, and the ice gradually cr… |
| **sustains** | `sustainable` | stem(sustain) | 4 | 4.2, 7.3, 8.1 | As the cold water circulates, it pumps deep nutrients upward toward the surface, and the sunlight re… |
| **immediately** | `mediate` | stem(mediate) | 4 | 4.3, 5.7, 6.3 | Once a female emperor penguin has laid her single egg, she immediately transfers it onto her partner… |
| **prevents** | `prevent` | substring(prevent) | 4 | 4.3, 4.5, 7.6 | Hundreds of males huddle together in a continuously rotating mass that distributes the cold equally … |
| **develop** | `redevelopment` | stem-of-family | 4 | 4.4, 5.2, 8.11 | A simple food chain forces every predator on it to develop more elaborate strategies.… |
| **circumpolar** | `polar` | substring(polar) | 3 | 4.1, 4.2 | Then the continent drifted slowly southward to its present position above the pole, and a vast new o… |
| **nutrients** | `nurture` | stem(nutrient) | 3 | 4.2, 8.5 | As the cold water circulates, it pumps deep nutrients upward toward the surface, and the sunlight re… |
| **penguins** | `penguin` | stem(penguin) | 2 | 4.2, 4.4 | Penguins dive after them, seals devour them, humpbacks sing through them.… |
| **temperatures** | `temperament` | stem(temperature) | 2 | 4.3, 4.5 | The male incubates the egg on his feet beneath a brood pouch of warm skin for four consecutive month… |
| **equally** | `equivalent` | stem(equal) | 2 | 4.3, 5.4 | Hundreds of males huddle together in a continuously rotating mass that distributes the cold equally … |
| **forces** | `enforce` | stem(force) | 2 | 4.4, 9.53 | A simple food chain forces every predator on it to develop more elaborate strategies.… |
| **terminates** | `terminate` | stem(terminate) | 2 | 4.4, 8.5 | Each predator has devised a specialised technique tuned exactly to its single available prey, and th… |
| **supports** | `support` | stem(support) | 2 | 4.5 | The entire Antarctic continent supports only one species of true insect, a flightless midge two mill… |
| **inhabits** | `exhibit` | stem(habit) | 2 | 4.5, 8.3 | The entire Antarctic continent supports only one species of true insect, a flightless midge two mill… |
| **designating** | `designate` | stem(designat) | 2 | 4.8, 8.10 | Twelve nations signed a treaty designating the entire Antarctic continent as a scientific reserve, p… |
| **prohibiting** | `exhibit` | stem(prohibit) | 2 | 4.8, 9.42 | Twelve nations signed a treaty designating the entire Antarctic continent as a scientific reserve, p… |
| **activity** | `inactive` | stem(activ) | 2 | 4.8, 10.16 | Twelve nations signed a treaty designating the entire Antarctic continent as a scientific reserve, p… |
| **weapons** | `weapon` | stem(weapon) | 2 | 4.8, 10.17 | Twelve nations signed a treaty designating the entire Antarctic continent as a scientific reserve, p… |
| **nights** | `neighboring` | stem(night) | 2 | 4.10, 10.29 | Across the long polar nights, the sky above both peoples could suddenly ignite with the green and vi… |
| **curtains** | `obscure` | stem(curtain) | 2 | 4.10, 9.52 | Across the long polar nights, the sky above both peoples could suddenly ignite with the green and vi… |
| **planet's** | `planet` | substring(planet) | 2 | 4.11 | The planet's largest refrigerated archive is in the process of converting itself into the planet's l… |
| **fossils** | `fossil` | stem(fossil) | 1 | 4.1 | Today Antarctica constitutes the coldest, driest, windiest continent on the planet, a vast white des… |
| **circulates** | `circulation` | stem(circulate) | 1 | 4.2 | As the cold water circulates, it pumps deep nutrients upward toward the surface, and the sunlight re… |
| **provokes** | `provoke` | stem(provoke) | 1 | 4.2 | As the cold water circulates, it pumps deep nutrients upward toward the surface, and the sunlight re… |
| **waters** | `hydrothermal` | stem(water) | 1 | 4.2 | Blue whales, the largest creatures the planet has ever generated, migrate annually to these waters a… |
| **humpbacks** | `humpback` | stem(humpback) | 1 | 4.2 | Penguins dive after them, seals devour them, humpbacks sing through them.… |
| **induces** | `induce` | substring(induce) | 1 | 4.2 | Without the patient upwelling of nutrients that the circumpolar current induces, none of this concen… |
| **imposes** | `impose` | substring(impose) | 1 | 4.3 | The Antarctic ice imposes a peculiar parental rule on its most famous resident.… |
| **parental** | `apparent` | stem(parent) | 1 | 4.3 | The Antarctic ice imposes a peculiar parental rule on its most famous resident.… |
| **transfers** | `refer` | stem(transfer) | 1 | 4.3 | Once a female emperor penguin has laid her single egg, she immediately transfers it onto her partner… |
| **distributes** | `contribution` | stem(tribute) | 1 | 4.3 | Hundreds of males huddle together in a continuously rotating mass that distributes the cold equally … |
| **fathers** | `patriarchy` | stem(father) | 1 | 4.3 | When the chicks finally hatch, the females return from the sea with their stomachs full of fish, and… |
| **silently** | `resilient` | stem(silent) | 1 | 4.4 | Leopard seals lurk just beneath the surface near a crack in the ice and wait silently for penguins r… |
| **flightless** | `slight` | stem(flight) | 1 | 4.5 | The entire Antarctic continent supports only one species of true insect, a flightless midge two mill… |
| **withstands** | `withstand` | stem(withstand) | 1 | 4.5 | It withstands temperatures down to minus fifteen degrees by generating an antifreeze protein in its … |
| **fluids** | `fluctuate` | stem(fluid) | 1 | 4.5 | It withstands temperatures down to minus fifteen degrees by generating an antifreeze protein in its … |
| **crystals** | `crystalline` | stem(crystal) | 1 | 4.5 | It withstands temperatures down to minus fifteen degrees by generating an antifreeze protein in its … |
| **expeditions** | `expedite` | stem(expedition) | 1 | 4.6 | Two expeditions raced across the Antarctic ice to be the first to reach the South Pole.… |
| **caches** | `cache` | stem(cache) | 1 | 4.6 | The Norwegian explorer Amundsen prepared meticulously: sled dogs trained from infancy, a route surve… |
| **optional** | `optimize` | stem(option) | 1 | 4.6 | Preparation, the Antarctic concluded, is not optional in this climate.… |
| **bubbles** | `bubble` | stem(bubble) | 1 | 4.8 | Decades later, scientists drilling deep cores into the ice extracted bubbles of air that had been pr… |
| **catastrophically** | `trophic` | substring(trophic) | 1 | 4.8 | The same scientists discovered, through routine monitoring, that the ozone layer above the continent… |
| **globally** | `globalization` | stem(global) | 1 | 4.8 | The discovery provoked the most successful environmental agreement ever signed, which eliminated tho… |
| **recover** | `coverage` | strip-re | 1 | 4.8 | The discovery provoked the most successful environmental agreement ever signed, which eliminated tho… |
| **expands** | `expand` | stem(expand) | 1 | 4.9 | Across its surface a vast layer of pack ice expands every winter and retreats every summer, and acro… |
| **surfaces** | `interface` | stem(surface) | 1 | 4.9 | The bear waits motionlessly at a breathing hole in the ice until a seal surfaces, then strikes with … |
| **narwhals** | `narwhal` | stem(narwhal) | 1 | 4.9 | Narwhals, the deepwater whales whose males generate a single spiral tusk reminiscent of a unicorn's … |
| **deepwater** | `water` | substring(water) | 1 | 4.9 | Narwhals, the deepwater whales whose males generate a single spiral tusk reminiscent of a unicorn's … |
| **shifting** | `shift` | stem(shift) | 1 | 4.9 | Narwhals, the deepwater whales whose males generate a single spiral tusk reminiscent of a unicorn's … |
| **walruses** | `walrus` | substring(walrus) | 1 | 4.9 | Walruses pry open breathing holes in the fresh ice with their own tusks.… |
| **compacted** | `compatible` | stem(compact) | 1 | 4.10 | The Inuit of the Arctic constructed shelters from compacted snow bricks cut and stacked into a domed… |
| **bricks** | `brick` | stem(brick) | 1 | 4.10 | The Inuit of the Arctic constructed shelters from compacted snow bricks cut and stacked into a domed… |
| **harpoons** | `harpoon` | stem(harpoon) | 1 | 4.10 | They hunted seal, walrus, whale, and polar bear with harpoons and dog sleds, and inhabited every coa… |
| **northwest** | `north` | substring(north) | 1 | 4.11 | The thaw is opening the long-frozen Northwest Passage to commercial shipping, and Russia, Canada, De… |
| **deposits** | `composite` | stem(deposit) | 1 | 4.11 | The thaw is opening the long-frozen Northwest Passage to commercial shipping, and Russia, Canada, De… |

## Chapter 5 (41 words)

| Word | Parent | Path | Hits | Sections | Sample sentence |
|---|---|---|---:|---|---|
| **transmitted** | `neurotransmitter` | stem(transmitt) | 6 | 5.4, 8.6, 8.11 | The entire terrain of the continent, every water source, every dangerous animal, every safe ridge, w… |
| **resembles** | `assemble` | stem(semble) | 4 | 5.1, 7.6, 8.5 | The result is a continent that biologically resembles no other on the planet, and which has therefor… |
| **canoes** | `canoe` | stem(canoe) | 3 | 5.5, 5.6 | They steered outrigger canoes from one island to the next across distances that European sailors, ev… |
| **preserves** | `preserve` | stem(serve) | 3 | 5.7, 9.7, 10.7 | That footage still survives in the Australian archives, and the species it preserves does not.… |
| **marsupials** | `marsupial` | stem(marsupial) | 2 | 5.2, 5.3 | In the absence of placental mammals, the marsupials of Australia diversified to fill every ecologica… |
| **functioning** | `function` | stem(function) | 2 | 5.2, 9.5 | Kangaroos perfected the bouncing gait that allows them to traverse vast distances at low energy cost… |
| **springs** | `spring` | stem(spring) | 2 | 5.2, 10.7 | Kangaroos perfected the bouncing gait that allows them to traverse vast distances at low energy cost… |
| **crossing** | `crucial` | stem(cross) | 2 | 5.4, 10.35 | Aboriginal Australians arrived on the continent during the Ice Age, crossing narrow stretches of oce… |
| **possessed** | `assess` | stem(possess) | 2 | 5.5, 10.3 | The Polynesian peoples of the Pacific possessed no compass, no chronometer, no astrolabe, and yet th… |
| **currents** | `concur` | stem(current) | 2 | 5.5, 6.4 | They interpreted the colour and the temperature of ocean currents beneath their hands.… |
| **seabirds** | `sea` | stem(seabird) | 2 | 5.5, 6.6 | They tracked the flight directions of seabirds to locate land below the horizon.… |
| **locate** | `allocate` | stem-of-family | 2 | 5.5, 9.46 | They tracked the flight directions of seabirds to locate land below the horizon.… |
| **platforms** | `transform` | stem(platform) | 2 | 5.6, 10.2 | On a particular remote Polynesian island, now called Easter Island, the original settlers gradually … |
| **sustaining** | `sustainable` | stem(sustain) | 2 | 5.6, 9.48 | Easter Island therefore constitutes the cleanest documented sample of an ecological suicide: a socie… |
| **barriers** | `barren` | stem(barrier) | 1 | 5.1 | Australia tore loose from the supercontinent Gondwana very early in its geological history and drift… |
| **biologically** | `biosphere` | stem(biolog) | 1 | 5.1 | The result is a continent that biologically resembles no other on the planet, and which has therefor… |
| **strictly** | `restrict` | stem(strict) | 1 | 5.1 | The result is a continent that biologically resembles no other on the planet, and which has therefor… |
| **koalas** | `koala` | stem(koala) | 1 | 5.2 | Koalas ascended into the eucalyptus canopy and developed an entire metabolism specialised to digest … |
| **kangaroos** | `kangaroo` | stem(kangaroo) | 1 | 5.2 | Kangaroos perfected the bouncing gait that allows them to traverse vast distances at low energy cost… |
| **beaver's** | `beaver` | substring(beaver) | 1 | 5.3 | The platypus is a mammal that lays eggs rather than bearing live young, swims with webbed feet, poss… |
| **venomous** | `venom` | stem(venom) | 1 | 5.3 | The platypus is a mammal that lays eggs rather than bearing live young, swims with webbed feet, poss… |
| **specimens** | `specimen` | stem(specimen) | 1 | 5.3 | Only when subsequent live specimens arrived did the scientific establishment accept that the creatur… |
| **monotremes** | `monoculture` | stem(monotreme) | 1 | 5.3 | It belongs to a tiny order called the monotremes, the only surviving mammals that still reproduce by… |
| **placentals** | `replace` | stem(placental) | 1 | 5.3 | It belongs to a tiny order called the monotremes, the only surviving mammals that still reproduce by… |
| **levels** | `elevate` | stem(level) | 1 | 5.4 | Aboriginal Australians arrived on the continent during the Ice Age, crossing narrow stretches of oce… |
| **navigational** | `ion` | stem(navigation) | 1 | 5.4 | A single song constitutes a complete navigational chart and ecological encyclopaedia simultaneously.… |
| **positions** | `composite` | stem(position) | 1 | 5.5 | They read the positions of stars by memory.… |
| **outrigger** | `trigger` | substring(trigger) | 1 | 5.5 | They steered outrigger canoes from one island to the next across distances that European sailors, ev… |
| **chiefdoms** | `achieve` | stem(chiefdom) | 1 | 5.6 | The chiefdoms that had once cooperated on the moai now began to wage war against each other, and the… |
| **cooperated** | `cooperate` | stem(cooperat) | 1 | 5.6 | The chiefdoms that had once cooperated on the moai now began to wage war against each other, and the… |
| **convicts** | `convict` | stem(convict) | 1 | 5.7 | Captain Cook charted the eastern coast of Australia, and the British Empire immediately recognised t… |
| **archives** | `achieve` | stem(archive) | 1 | 5.7 | That footage still survives in the Australian archives, and the species it preserves does not.… |
| **rabbits** | `rabbit` | stem(rabbit) | 1 | 5.8 | An English farmer released a small group of European rabbits onto his Australian estate so that he c… |
| **rabbit-proof** | `rabbit` | substring(rabbit) | 1 | 5.8 | The Australian government constructed a rabbit-proof fence stretching for thousands of kilometres ac… |
| **polyps** | `polyp` | stem(polyp) | 1 | 5.9 | It is constructed by the slow secretion of calcium carbonate by colonies of coral polyps cooperating… |
| **cooperating** | `cooperate` | stem(cooperat) | 1 | 5.9 | It is constructed by the slow secretion of calcium carbonate by colonies of coral polyps cooperating… |
| **corals** | `core` | stem(coral) | 1 | 5.9 | When the surrounding sea temperature ascends only a few degrees above the long-term average, the cor… |
| **partners** | `counterpart` | stem(partner) | 1 | 5.9 | When the surrounding sea temperature ascends only a few degrees above the long-term average, the cor… |
| **bleached** | `bleaching` | stem(bleach) | 1 | 5.9 | Vast stretches of the reef have already bleached.… |
| **cyclones** | `cyclone` | stem(cyclone) | 1 | 5.9 | Meanwhile across the open Pacific, increasingly violent cyclones now strike the low-lying nations of… |
| **submerging** | `merge` | strip-sub | 1 | 5.9 | Meanwhile across the open Pacific, increasingly violent cyclones now strike the low-lying nations of… |

## Chapter 6 (30 words)

| Word | Parent | Path | Hits | Sections | Sample sentence |
|---|---|---|---:|---|---|
| **systems** | `system` | stem(system) | 4 | 6.5, 8.22, 10.22 | Once European ships had mastered the Atlantic wind systems, they used this ocean to construct one of… |
| **underwater** | `water` | substring(water) | 3 | 6.3, 6.5, 6.6 | The catastrophe provoked the deployment of underwater pressure sensors across every major seabed, wh… |
| **shifts** | `shift` | stem(shift) | 3 | 6.3, 9.55 | The catastrophe provoked the deployment of underwater pressure sensors across every major seabed, wh… |
| **columns** | `culmination` | stem(column) | 2 | 6.1, 9.26 | The air above the land ascends in vast convection columns, and the moisture-saturated air from the I… |
| **spices** | `glaciation` | stem(spice) | 2 | 6.2, 8.15 | They sailed south to India in summer on the inward wind, exchanged spices and gemstones, and returne… |
| **gemstones** | `gemstone` | stem(gemstone) | 2 | 6.2, 8.15 | They sailed south to India in summer on the inward wind, exchanged spices and gemstones, and returne… |
| **inland** | `land` | strip-in | 2 | 6.3, 10.30 | Yet immediately before the first wave arrived, elephants, birds, and dogs had already begun to flee … |
| **winters** | `winter` | stem(winter) | 2 | 6.4, 9.52 | This current is the Gulf Stream, and it explains why London receives mild winters while Canadian cit… |
| **submerged** | `merge` | strip-sub | 2 | 6.5, 7.1 | The entire ridge is submerged from view, yet it traces the boundary between the American tectonic pl… |
| **circuits** | `circulation` | stem(circuit) | 2 | 6.5, 10.31 | Once European ships had mastered the Atlantic wind systems, they used this ocean to construct one of… |
| **reliability** | `liable` | stem(liabil) | 1 | 6.1 | The monsoon constitutes the literal lifeline of more than two billion people, and its annual reliabi… |
| **traders** | `trade` | substring(trade) | 1 | 6.2 | Arab traders mastered the monsoon pattern long before Europe arrived.… |
| **fleets** | `fleet` | stem(fleet) | 1 | 6.2 | Chinese fleets under the admiral Zheng He traversed the same routes in colossal wooden vessels, reac… |
| **vessels** | `vessel` | stem(vessel) | 1 | 6.2 | Chinese fleets under the admiral Zheng He traversed the same routes in colossal wooden vessels, reac… |
| **sensors** | `sensor` | stem(sensor) | 1 | 6.3 | The catastrophe provoked the deployment of underwater pressure sensors across every major seabed, wh… |
| **warnings** | `warning` | stem(warning) | 1 | 6.3 | The catastrophe provoked the deployment of underwater pressure sensors across every major seabed, wh… |
| **reproduced** | `produce` | stem(produc) | 1 | 6.3 | The instinct of an animal, in this case, had to be reproduced by an instrument.… |
| **tempers** | `temperament` | stem(temper) | 1 | 6.4 | A vast warm current ascends from the tropics along the eastern coast of the Americas, then traverses… |
| **extends** | `extend` | stem(extend) | 1 | 6.5 | Beneath the Atlantic Ocean runs a vast underwater mountain range that extends from the abyssal plain… |
| **constituting** | `constitute` | stem(constitut) | 1 | 6.5 | Beneath the Atlantic Ocean runs a vast underwater mountain range that extends from the abyssal plain… |
| **manufactured** | `manufacturing` | stem(manufactur) | 1 | 6.5 | Once European ships had mastered the Atlantic wind systems, they used this ocean to construct one of… |
| **captives** | `captive` | stem(captive) | 1 | 6.5 | Once European ships had mastered the Atlantic wind systems, they used this ocean to construct one of… |
| **clicks** | `click` | stem(click) | 1 | 6.6 | Dolphins navigate by emitting rapid clicks and interpreting the returning echoes, mapping their unde… |
| **modifying** | `modify` | stem(modify) | 1 | 6.6 | Humpback whales produce songs that propagate hundreds of kilometres through the ocean, with every me… |
| **phrases** | `emphasize` | stem(phrase) | 1 | 6.6 | Humpback whales produce songs that propagate hundreds of kilometres through the ocean, with every me… |
| **collaboratively** | `collaborate` | stem(collaborat) | 1 | 6.6 | Humpback whales produce songs that propagate hundreds of kilometres through the ocean, with every me… |
| **octopuses** | `octopus` | substring(octopus) | 1 | 6.6 | Octopuses, despite an entirely separate evolutionary lineage from any vertebrate, demonstrate remark… |
| **albatrosses** | `albatross` | substring(albatross) | 1 | 6.6 | Albatrosses, the largest seabirds on the planet, exploit the strong winds of the Southern Ocean to c… |
| **featureless** | `feasible` | stem(feature) | 1 | 6.6 | The open ocean is not the silent and featureless wilderness early sailors imagined.… |
| **densely** | `density` | stem(dense) | 1 | 6.6 | The aquatic ecosystem at every depth is densely inhabited by minds of forms we have only recently be… |

## Chapter 7 (50 words)

| Word | Parent | Path | Hits | Sections | Sample sentence |
|---|---|---|---:|---|---|
| **universal** | `university` | stem(ivers) | 4 | 7.12, 9.25, 9.55 | Football has become the third major South American export to the world after the potato and the choc… |
| **fossilised** | `fossil` | substring(fossil) | 3 | 7.1, 7.5, 9.33 | The thrust of that subduction has been so persistent that fossilised marine shells are still being d… |
| **shells** | `shelf` | stem(shell) | 3 | 7.1, 10.16, 10.23 | The thrust of that subduction has been so persistent that fossilised marine shells are still being d… |
| **earthquakes** | `earthquake` | stem(earthquake) | 3 | 7.1, 7.8, 9.4 | The same subduction has triggered a chain of active volcanoes along the western coast and induced th… |
| **powerful** | `power` | stem(power) | 3 | 7.2, 9.21, 10.28 | On every island Darwin encountered a slightly different variety of small finch, and the beaks of eac… |
| **suppressed** | `oppression` | stem(suppress) | 3 | 7.2, 9.19, 10.15 | Knowing how thoroughly his society would resist the implication that humans had emerged from the sam… |
| **glaciers** | `glacier` | stem(glacier) | 3 | 7.5, 9.1, 10.7 | Glaciers descend from the pristine surrounding mountains and crawl slowly toward the Atlantic, where… |
| **fjords** | `fjord` | stem(fjord) | 3 | 7.5, 9.1, 10.7 | Glaciers descend from the pristine surrounding mountains and crawl slowly toward the Atlantic, where… |
| **valleys** | `valley` | stem(valley) | 3 | 7.6, 8.23, 10.36 | Several valleys within the Atacama have not recorded a single drop of precipitation in centuries.… |
| **constructing** | `construe` | stem(construct) | 3 | 7.7, 8.21, 9.49 | The Inca empire occupied the entire spine of the Andes from modern Colombia to Chile without ever in… |
| **executed** | `executive` | stem(execut) | 3 | 7.9, 9.12, 9.53 | Pizarro accepted the ransom and then, in a final deceitful gesture, executed Atahualpa anyway.… |
| **ridges** | `ridge` | stem(ridge) | 2 | 7.1, 7.7 | The thrust of that subduction has been so persistent that fossilised marine shells are still being d… |
| **consisted** | `inconsistency` | stem(consist) | 2 | 7.2 | On every island Darwin encountered a slightly different variety of small finch, and the beaks of eac… |
| **freshwater** | `water` | substring(water) | 2 | 7.3, 10.6 | The Amazon delivers a volume of fresh water sufficient to push the saltwater of the ocean back a hun… |
| **megafauna** | `fauna` | substring(fauna) | 2 | 7.5, 10.1 | Darwin during his Beagle voyage excavated the fossilised bones of an extinct giant ground sloth in t… |
| **condensing** | `density` | stem(condens) | 2 | 7.6, 9.30 | The Atacama Desert occupies a narrow coastal strip along the western edge of South America, where th… |
| **differed** | `indifference` | stem(differ) | 1 | 7.2 | On every island Darwin encountered a slightly different variety of small finch, and the beaks of eac… |
| **pointed** | `appoint` | stem(point) | 1 | 7.2 | On every island Darwin encountered a slightly different variety of small finch, and the beaks of eac… |
| **adapting** | `adapt` | stem(adapt) | 1 | 7.2 | Darwin realised that a single ancestral species had diversified gradually into multiple distinct for… |
| **saltwater** | `water` | substring(water) | 1 | 7.3 | The Amazon delivers a volume of fresh water sufficient to push the saltwater of the ocean back a hun… |
| **sloths** | `sloth` | stem(sloth) | 1 | 7.4 | Sloths cultivate algae on their own fur in order to merge perfectly with the surrounding foliage.… |
| **moments** | `momentum` | stem(moment) | 1 | 7.4 | Within moments any monkey or bird struck by the dart drops paralysed from the canopy.… |
| **southernmost** | `southern` | substring(southern) | 1 | 7.5 | The southernmost extremity of South America is Patagonia, a vast wind-scoured wasteland in which the… |
| **rovers** | `rover` | stem(rover) | 1 | 7.6 | NASA tests its Mars rovers in the Atacama because the local environment so closely resembles the sur… |
| **approximates** | `approximate` | stem(approximate) | 1 | 7.6 | NASA tests its Mars rovers in the Atacama because the local environment so closely resembles the sur… |
| **observations** | `observe` | stem(observation) | 1 | 7.6 | For the same reason, astronomers have constructed the largest array of radio telescopes on the plane… |
| **uninhabitable** | `inhabit` | stem(inhabit) | 1 | 7.6 | The very absence that makes the Atacama uninhabitable is what renders it scientifically irreplaceabl… |
| **irreplaceable** | `replace` | stem(replace) | 1 | 7.6 | The very absence that makes the Atacama uninhabitable is what renders it scientifically irreplaceabl… |
| **inventing** | `invent` | substring(invent) | 1 | 7.7 | The Inca empire occupied the entire spine of the Andes from modern Colombia to Chile without ever in… |
| **wheeled** | `rotation` | stem(wheel) | 1 | 7.7 | The Inca empire occupied the entire spine of the Andes from modern Colombia to Chile without ever in… |
| **quipus** | `quipu` | stem(quipu) | 1 | 7.7 | Information was encoded into knotted cords called quipus, which trained record-keepers could interpr… |
| **runners** | `runner` | stem(runner) | 1 | 7.7 | Information was encoded into knotted cords called quipus, which trained record-keepers could interpr… |
| **conquistadors** | `conquistador` | stem(conquistador) | 1 | 7.8 | The ridge had concealed the city in the clouds for so long that the Spanish conquistadors never even… |
| **suspected** | `inspect` | stem(suspect) | 1 | 7.8 | The ridge had concealed the city in the clouds for so long that the Spanish conquistadors never even… |
| **approached** | `approximate` | stem(approach) | 1 | 7.9 | A small Spanish band led by the captain Pizarro approached the Inca empire with horses, swords, and … |
| **swords** | `sword` | stem(sword) | 1 | 7.9 | A small Spanish band led by the captain Pizarro approached the Inca empire with horses, swords, and … |
| **succession** | `access` | stem(succes) | 1 | 7.9 | The empire was therefore convulsed by a succession crisis and a depopulated military when Pizarro pr… |
| **stands** | `substantial` | stem(stand) | 1 | 7.10 | In the high thin air of the Bolivian altiplano stands a mountain called Potosí, beneath which lay on… |
| **richest** | `chest` | substring(chest) | 1 | 7.10 | In the high thin air of the Bolivian altiplano stands a mountain called Potosí, beneath which lay on… |
| **concentrations** | `rational` | stem(concentration) | 1 | 7.10 | In the high thin air of the Bolivian altiplano stands a mountain called Potosí, beneath which lay on… |
| **labourers** | `labour` | substring(labour) | 1 | 7.10 | Spanish authorities forced indigenous Quechua and African slave labourers into the oxygen-thin tunne… |
| **oxygen-thin** | `oxygen` | substring(oxygen) | 1 | 7.10 | Spanish authorities forced indigenous Quechua and African slave labourers into the oxygen-thin tunne… |
| **uncounted** | `counterbalance` | stem(count) | 1 | 7.10 | Spanish authorities forced indigenous Quechua and African slave labourers into the oxygen-thin tunne… |
| **galleons** | `galleon` | stem(galleon) | 1 | 7.10 | The silver was loaded onto enormous Spanish galleons and shipped first to Spain and then onward to M… |
| **tubers** | `tube` | stem(tuber) | 1 | 7.11 | The Andes had cultivated the potato for thousands of years before the Spanish encountered it, and th… |
| **sweetened** | `sweet` | substring(sweet) | 1 | 7.11 | The Spanish added sugar to the bitter Aztec drink, sweetened the resulting beverage, exported it to … |
| **imagines** | `imaginary` | stem(agine) | 1 | 7.11 | The Spanish added sugar to the bitter Aztec drink, sweetened the resulting beverage, exported it to … |
| **ranches** | `ranch` | substring(ranch) | 1 | 7.12 | The Amazon rainforest, often called the lungs of the planet, is being cleared rapidly at the present… |
| **murals** | `mural` | stem(mural) | 1 | 7.12 | Football has become the third major South American export to the world after the potato and the choc… |
| **speaking** | `peak` | stem(speak) | 1 | 7.12 | Football has become the third major South American export to the world after the potato and the choc… |

## Chapter 8 (106 words)

| Word | Parent | Path | Hits | Sections | Sample sentence |
|---|---|---|---:|---|---|
| **severed** | `severe` | stem(sever) | 4 | 8.1, 9.1, 9.18 | The same range severed the dry cold air arriving from the north and forced the humid air ascending f… |
| **governed** | `governance` | stem(govern) | 4 | 8.8, 9.11, 9.27 | In the fifth century before the common era, an unemployed clerk named Confucius walked from one Chin… |
| **partially** | `impartial` | stem(partial) | 4 | 8.18, 9.4, 9.8 | A single agricultural product cultivated in one colony had been used to undermine and partially dism… |
| **organisms** | `organic` | stem(organism) | 3 | 8.4, 9.21, 9.40 | The humid rainforests of Southeast Asia have generated some of the strangest organisms on the planet… |
| **perceptible** | `perceive` | stem(percept) | 3 | 8.12, 9.3, 9.44 | The Hindu cosmology conceives the perceptible world as the manifestation of Brahman, the ultimate re… |
| **combines** | `combine` | stem(combine) | 3 | 8.12, 10.22, 10.31 | Hindu practitioners devised yoga, a discipline that combines bodily posture, controlled breathing, a… |
| **inventions** | `invent` | substring(invent) | 3 | 8.13, 10.13, 10.37 | Across the same span China generated four inventions that eventually reshaped the entire planet: pap… |
| **reintroduced** | `introduce` | strip-re | 2 | 8.3, 10.23 | Russian and Korean biologists are now openly contemplating whether the species could be reintroduced… |
| **non-human** | `human` | substring(human) | 2 | 8.4, 8.6 | The orangutan, the great red-haired ape of Borneo and Sumatra, has been observed tearing a leaf from… |
| **structured** | `structure` | stem(structur) | 2 | 8.10, 9.9 | He standardised the script, the coinage, the units of length and weight, and abolished hereditary ar… |
| **extinguished** | `distinguish` | stem(extinguish) | 2 | 8.11, 9.7 | He renounced his royal inheritance, walked into the forest, and meditated beneath a tree we now call… |
| **doctrines** | `orthodox` | stem(doctrine) | 2 | 8.12, 9.12 | In the twentieth century a slight Indian lawyer named Mahatma Gandhi adapted the Hindu doctrines of … |
| **merchants** | `commence` | stem(merchant) | 2 | 8.13, 9.13 | The Tang dynasty capital of Chang'an was the largest international city in the world during its cent… |
| **tribes** | `tribe` | stem(tribe) | 2 | 8.16, 9.5 | A poor steppe chieftain named Temujin, who would later assume the title Genghis Khan, organised the … |
| **extending** | `extend` | stem(extend) | 2 | 8.16, 10.26 | A poor steppe chieftain named Temujin, who would later assume the title Genghis Khan, organised the … |
| **aristocrat** | `bureaucratic` | stem-of-family | 2 | 8.17, 9.36 | The medieval samurai class devised bushido, an ethical code in which loyalty, honour, and composure … |
| **collectively** | `intelligent` | stem(collect) | 2 | 8.20, 10.27 | A short pragmatic leader named Deng Xiaoping initiated a series of reforms now collectively designat… |
| **households** | `economic` | stem(household) | 2 | 8.20, 9.4 | A short pragmatic leader named Deng Xiaoping initiated a series of reforms now collectively designat… |
| **bicycles** | `recycle` | stem(bicycle) | 2 | 8.21, 10.14 | Within a generation the same continent that had been pedalling bicycles to the rice paddy was constr… |
| **semiconductors** | `deduce` | stem(semiconductor) | 2 | 8.21 | The telecommunications company Huawei, when sanctioned by the United States and denied access to Ame… |
| **restricting** | `restrict` | stem(strict) | 2 | 8.22, 10.35 | To curb the demographic explosion that had accompanied the early decades of the People's Republic, t… |
| **grandparents** | `parent` | substring(parent) | 2 | 8.22, 10.5 | sealyra was born into precisely this demographic interlude, an only daughter saturated from infancy … |
| **financed** | `financial` | stem(financ) | 2 | 8.22, 9.35 | Rather than enter institutional employment upon graduation, she leveraged the saturating new mobile … |
| **ancestors** | `ancestral` | stem(ancestor) | 2 | 8.23, 9.33 | The paleolithic peoples of north Asia, ancestors of every indigenous community from Siberia to Alask… |
| **solutions** | `solvent` | stem(solution) | 1 | 8.2 | The Tibetan plateau, lifted into air that contains only half the oxygen of sea level, has forced its… |
| **assists** | `consistent` | stem(assist) | 1 | 8.2 | The snow leopard has evolved a tail nearly as long as its body, which assists balance when sprinting… |
| **humidify** | `humidity` | stem(humid) | 1 | 8.2 | The snow leopard has evolved a tail nearly as long as its body, which assists balance when sprinting… |
| **speeds** | `speed` | stem(speed) | 1 | 8.2 | The Tibetan antelope has developed a specialised form of haemoglobin that binds oxygen more efficien… |
| **mammoths** | `mammoth` | stem(mammoth) | 1 | 8.3 | Beneath them lie the most spectacular discoveries of all: nearly intact juvenile mammoths excavated … |
| **riverbanks** | `derive` | stem(riverbank) | 1 | 8.3 | Beneath them lie the most spectacular discoveries of all: nearly intact juvenile mammoths excavated … |
| **undigested** | `congested` | stem(digest) | 1 | 8.3 | Beneath them lie the most spectacular discoveries of all: nearly intact juvenile mammoths excavated … |
| **contemplating** | `contemplate` | stem(contemplat) | 1 | 8.3 | Russian and Korean biologists are now openly contemplating whether the species could be reintroduced… |
| **surrogates** | `surrogate` | stem(surrogate) | 1 | 8.3 | Russian and Korean biologists are now openly contemplating whether the species could be reintroduced… |
| **makeshift** | `shift` | substring(shift) | 1 | 8.4 | The orangutan, the great red-haired ape of Borneo and Sumatra, has been observed tearing a leaf from… |
| **possessing** | `assess` | stem(possess) | 1 | 8.4 | The rafflesia, the largest flower on the planet, blooms across a metre of forest floor without posse… |
| **ancestrally** | `ancestral` | stem(ancestral) | 1 | 8.5 | The giant panda, an ancestrally carnivorous bear, transitioned several million years ago to a diet o… |
| **transitioned** | `transit` | substring(transit) | 1 | 8.5 | The giant panda, an ancestrally carnivorous bear, transitioned several million years ago to a diet o… |
| **extracts** | `abstract` | stem(extract) | 1 | 8.5 | The giant panda, an ancestrally carnivorous bear, transitioned several million years ago to a diet o… |
| **seventeen** | `event` | substring(event) | 1 | 8.5 | The giant panda, an ancestrally carnivorous bear, transitioned several million years ago to a diet o… |
| **undermines** | `undermine` | stem(dermine) | 1 | 8.5 | Its jaw secretes a complex venom that prevents wounds from clotting and gradually undermines the car… |
| **wounded** | `vulnerable` | stem(wound) | 1 | 8.5 | It simply tracks the wounded prey across the island for several days until the venom terminates the … |
| **seasoned** | `sea` | stem(season) | 1 | 8.6 | The sand washed off, and the seawater conveniently seasoned the potato.… |
| **potatoes** | `potato` | substring(potato) | 1 | 8.6 | Within a single generation every macaque in the local group was washing potatoes.… |
| **macaques** | `macaque` | stem(macaque) | 1 | 8.6 | Knowledge, the macaques had quietly demonstrated, does not require a written language.… |
| **requires** | `acquire` | stem(quire) | 1 | 8.6 | It only requires a willingness to watch what someone smarter than you has just figured out.… |
| **consumes** | `consume` | stem(consume) | 1 | 8.7 | The same farmers, generations later, domesticated a small white insect called the silkworm, which co… |
| **cultivators** | `cultivate` | stem(cultivator) | 1 | 8.7 | Chinese cultivators learned to harvest these cocoons before the moth emerged, unwinding them into im… |
| **cocoons** | `cocoon` | stem(cocoon) | 1 | 8.7 | Chinese cultivators learned to harvest these cocoons before the moth emerged, unwinding them into im… |
| **lengths** | `length` | stem(length) | 1 | 8.7 | Chinese cultivators learned to harvest these cocoons before the moth emerged, unwinding them into im… |
| **guarded** | `regard` | stem(guard) | 1 | 8.7 | The Chinese imperial government guarded the silkworm secret for over a thousand years, executing any… |
| **markets** | `marginal` | stem(market) | 1 | 8.7 | The Chinese imperial government guarded the silkworm secret for over a thousand years, executing any… |
| **generous** | `genre` | stem(gener) | 1 | 8.8 | Father generous to son.… |
| **masterstroke** | `stroke` | substring(stroke) | 1 | 8.8 | Then came the masterstroke.… |
| **memorise** | `commemorate` | stem(memor) | 1 | 8.8 | The Sui and Tang dynasties devised the imperial examination, an open written test of the Confucian c… |
| **five-thousand-character** | `character` | substring(character) | 1 | 8.9 | A near contemporary of Confucius, the elder Laozi, rode westward on a buffalo through the imperial g… |
| **conquering** | `conquest` | stem(conquer) | 1 | 8.10 | A king of the western Chinese state of Qin, named Ying Zheng, spent a decade conquering the six othe… |
| **magistrates** | `magistrate` | stem(magistrate) | 1 | 8.10 | He standardised the script, the coinage, the units of length and weight, and abolished hereditary ar… |
| **involves** | `involve` | stem(volve) | 1 | 8.11 | He renounced his royal inheritance, walked into the forest, and meditated beneath a tree we now call… |
| **extinguishing** | `distinguish` | stem(extinguish) | 1 | 8.11 | He renounced his royal inheritance, walked into the forest, and meditated beneath a tree we now call… |
| **teaching** | `treacherous` | stem(teach) | 1 | 8.11 | He emerged from the meditation as the Buddha, and the teaching he subsequently transmitted spread ac… |
| **conceives** | `conceive` | stem(conceive) | 1 | 8.12 | The Hindu cosmology conceives the perceptible world as the manifestation of Brahman, the ultimate re… |
| **reunification** | `unify` | strip-re | 1 | 8.12 | The Hindu cosmology conceives the perceptible world as the manifestation of Brahman, the ultimate re… |
| **avenues** | `convene` | stem(avenue) | 1 | 8.13 | The Tang dynasty capital of Chang'an was the largest international city in the world during its cent… |
| **immortality** | `moral` | stem(mortal) | 1 | 8.13 | Across the same span China generated four inventions that eventually reshaped the entire planet: pap… |
| **oceanic** | `oceanography` | stem(ocean) | 1 | 8.13 | Across the same span China generated four inventions that eventually reshaped the entire planet: pap… |
| **world-altering** | `alter` | substring(alter) | 1 | 8.13 | Few civilisations have generated as many world-altering technologies in a single epoch.… |
| **sutras** | `sutra` | stem(sutra) | 1 | 8.14 | Tang dynasty Buddhist monks first carved entire sutras onto wooden blocks and printed multiple copie… |
| **alphabet** | `alpha` | substring(alpha) | 1 | 8.14 | The Chinese technology eventually propagated westward across the Silk Road and emerged in Europe fou… |
| **collected** | `intelligent` | stem(collect) | 1 | 8.14 | Bi Sheng himself died in relative obscurity in China, his name preserved only because a contemporary… |
| **travelled** | `travel` | substring(travel) | 1 | 8.15 | Along its caravan tracks travelled Buddhist scriptures from India into China, papermaking from China… |
| **papermaking** | `paper` | substring(paper) | 1 | 8.15 | Along its caravan tracks travelled Buddhist scriptures from India into China, papermaking from China… |
| **formulas** | `transform` | stem(formula) | 1 | 8.15 | Along its caravan tracks travelled Buddhist scriptures from India into China, papermaking from China… |
| **crucibles** | `crucible` | stem(crucible) | 1 | 8.15 | The oasis cities along the route, Samarkand, Bukhara, Kashgar, transformed into multilingual multi-r… |
| **passengers** | `encompass` | stem(passenger) | 1 | 8.15 | The same road also conveyed the most lethal of its passengers: the plague bacterium, riding in the g… |
| **marmots** | `marmot` | stem(marmot) | 1 | 8.15 | The same road also conveyed the most lethal of its passengers: the plague bacterium, riding in the g… |
| **crimean** | `crime` | substring(crime) | 1 | 8.16 | The same road, decades later, conveyed the bubonic plague from the Asian steppes into the Crimean po… |
| **director** | `direct` | substring(direct) | 1 | 8.17 | The post-war animator Hayao Miyazaki, the director Akira Kurosawa, and the novelist Haruki Murakami … |
| **exhausting** | `exhaustive` | stem(exhaust) | 1 | 8.18 | By the eighteenth century the British had developed an addiction to Chinese tea so thorough that the… |
| **legalise** | `eligible` | stem(legal) | 1 | 8.18 | When the Chinese commissioner Lin Zexu seized and burnt the British opium stock at Canton, the Royal… |
| **dismantle** | `mantle` | stem(mantle) | 1 | 8.18 | A single agricultural product cultivated in one colony had been used to undermine and partially dism… |
| **observers** | `observe` | stem(observer) | 1 | 8.19 | The Indonesian volcano Tambora erupted with such violence that its ash cloud encircled the entire pl… |
| **redistributed** | `distribute` | strip-re | 1 | 8.20 | A short pragmatic leader named Deng Xiaoping initiated a series of reforms now collectively designat… |
| **enterprises** | `interpret` | stem(enterprise) | 1 | 8.20 | A short pragmatic leader named Deng Xiaoping initiated a series of reforms now collectively designat… |
| **described** | `scribe` | substring(scribe) | 1 | 8.20 | Deng described the resulting hybrid as a socialist market economy, advocating that the country shoul… |
| **socialist** | `social` | substring(social) | 1 | 8.20 | Deng described the resulting hybrid as a socialist market economy, advocating that the country shoul… |
| **advocating** | `advocate` | stem(advocat) | 1 | 8.20 | Deng described the resulting hybrid as a socialist market economy, advocating that the country shoul… |
| **shorter** | `short` | stem(short) | 1 | 8.20 | Within four decades the experiment had transformed China into the second largest economy on the plan… |
| **high-speed** | `speed` | substring(speed) | 1 | 8.21 | Within a generation the same continent that had been pedalling bicycles to the rice paddy was constr… |
| **vehicles** | `convey` | stem(vehicle) | 1 | 8.21 | The Chinese manufacturers BYD and CATL eventually dominated the global market for electric vehicles … |
| **telecommunications** | `communicate` | stem(telecommunication) | 1 | 8.21 | The telecommunications company Huawei, when sanctioned by the United States and denied access to Ame… |
| **sanctioned** | `sanction` | stem(sanction) | 1 | 8.21 | The telecommunications company Huawei, when sanctioned by the United States and denied access to Ame… |
| **reconnecting** | `connect` | stem(connect) | 1 | 8.21 | The Made in China 2025 strategy declared the intention to achieve self-sufficiency in artificial int… |
| **colloquially** | `eloquent` | stem(colloquial) | 1 | 8.22 | To curb the demographic explosion that had accompanied the early decades of the People's Republic, t… |
| **one-child** | `child` | substring(child) | 1 | 8.22 | To curb the demographic explosion that had accompanied the early decades of the People's Republic, t… |
| **resources** | `resource` | stem(source) | 1 | 8.22 | sealyra was born into precisely this demographic interlude, an only daughter saturated from infancy … |
| **generational** | `generate` | stem(generation) | 1 | 8.22 | sealyra was born into precisely this demographic interlude, an only daughter saturated from infancy … |
| **converging** | `converge` | stem(converg) | 1 | 8.22 | sealyra was born into precisely this demographic interlude, an only daughter saturated from infancy … |
| **proceeded** | `precede` | stem(proceed) | 1 | 8.22 | She matriculated through the formal Chinese educational apparatus, qualified for an art conservatoir… |
| **multi-platform** | `platform` | substring(platform) | 1 | 8.22 | Rather than enter institutional employment upon graduation, she leveraged the saturating new mobile … |
| **ecosystems** | `ecosystem` | stem(ecosystem) | 1 | 8.22 | Rather than enter institutional employment upon graduation, she leveraged the saturating new mobile … |
| **human-computer** | `computer` | substring(computer) | 1 | 8.22 | Her current trajectory aims at the emergent discipline of human-computer interaction, in which she i… |
| **conditioned** | `conditioning` | stem(condition) | 1 | 8.22 | Her current trajectory aims at the emergent discipline of human-computer interaction, in which she i… |
| **reinventing** | `prevent` | stem(invent) | 1 | 8.22 | She is, in this sense, neither a representative of her generation nor an exception to it, but a sing… |
| **overland** | `land` | strip-over | 1 | 8.23 | Their economic system rested on the barter exchange of meat, hide, and bone across small kin-based b… |
| **recitation** | `incentive` | strip-re | 1 | 8.23 | Their accumulated folklore, transmitted across centuries by oral recitation, preserved an entire ant… |
| **reconstructing** | `construe` | stem(construct) | 1 | 8.23 | Their accumulated folklore, transmitted across centuries by oral recitation, preserved an entire ant… |

## Chapter 9 (240 words)

| Word | Parent | Path | Hits | Sections | Sample sentence |
|---|---|---|---:|---|---|
| **conducted** | `deduce` | stem(conduct) | 7 | 9.9, 9.31, 9.39 | The abbess Hildegard of Bingen produced the earliest European treatise on herbal medicine, composed … |
| **streets** | `strategy` | stem(street) | 7 | 9.12, 9.26, 9.35 | Some survivors organised themselves into processions of flagellants who scourged themselves through … |
| **founding** | `found` | stem(found) | 7 | 9.24, 9.42, 9.51 | The statement "I think, therefore I am" thereby became the founding axiom of modern rationalism, and… |
| **experiments** | `experiment` | stem(experiment) | 7 | 9.25, 9.40, 9.47 | When the bubonic plague closed Cambridge, a young undergraduate named Isaac Newton retreated to the … |
| **children** | `child` | substring(child) | 6 | 9.7, 9.12, 9.30 | The cave at Lascaux in southern France preserves vivid wall paintings of bulls, horses, and stags th… |
| **painted** | `painting` | stem(paint) | 6 | 9.13, 9.14, 9.15 | Their patronage supported Giotto, who developed early linear perspective in painting, and Botticelli… |
| **invented** | `invent` | substring(invent) | 6 | 9.18, 9.20, 9.25 | The German artisan Gutenberg invented movable metal type and printed the first European Bible, then … |
| **schools** | `schedule` | stem(school) | 5 | 9.37, 9.42, 10.27 | After the French Revolution, painting split into competing schools.… |
| **converted** | `avert` | stem(convert) | 5 | 9.43, 9.49, 10.14 | He converted the entire equatorial rainforest into a privately owned rubber plantation and compelled… |
| **emotional** | `motivate` | stem(emotion) | 4 | 9.22, 9.44, 9.50 | Baroque painting abandoned the calm clarity of the Renaissance in favour of high contrast and emotio… |
| **exceeded** | `exceed` | stem(exceed) | 4 | 9.23, 10.4, 10.15 | The English physician Harvey measured the volume of blood pumped per minute by the heart, demonstrat… |
| **classical** | `clash` | stem(class) | 4 | 9.29, 9.41, 9.50 | The three composers who consolidated the classical symphony all converged on imperial Vienna across … |
| **experimental** | `experiment` | stem(experiment) | 4 | 9.40, 9.41, 9.44 | He developed the gentle heating process now called pasteurisation to preserve milk and wine, and mos… |
| **deploying** | `exploit` | stem(deploy) | 4 | 9.46, 9.47, 9.48 | Joyce wrote Ulysses, narrating a single day in Dublin across seven hundred pages, each chapter deplo… |
| **settlement** | `sedimentation` | stem(settle) | 3 | 9.6, 10.10, 10.35 | The Vikings raided the coastal monasteries of England, colonised Iceland and Greenland, and reached … |
| **painter** | `painting` | stem(paint) | 3 | 9.15, 9.17, 10.24 | The Flemish painter Jan van Eyck developed a refined oil painting technique in which thin glazes of … |
| **drafting** | `draft` | stem(draft) | 3 | 9.21, 9.35, 10.4 | In the same city, the philosopher Spinoza, expelled by his own Jewish community for heretical panthe… |
| **identifying** | `identify` | stem(identify) | 3 | 9.23, 9.44, 9.51 | The Flemish anatomist Vesalius, working at the medical school in Padua, retrieved corpses from gallo… |
| **commercially** | `commercial` | stem(commercial) | 3 | 9.28, 10.13, 10.21 | The German Handel migrated to London, wrote commercially successful operas and oratorios, and author… |
| **childhood** | `child` | substring(child) | 3 | 9.44, 9.50, 10.25 | The neurologist Freud encouraged his patients to recline on a couch and articulate whatever entered … |
| **restructured** | `structure` | stem(structur) | 3 | 9.55, 10.14, 10.37 | European universities accordingly restructured their language curriculum to incorporate translation … |
| **sheets** | `sheet` | stem(sheet) | 2 | 9.1, 10.6 | The continent of Europe was sculpted, across successive ice ages, by the advance and retreat of imme… |
| **decisions** | `decisive` | stem(decision) | 2 | 9.2, 9.4 | Each citizen could speak in turn, and decisions required a majority of raised hands.… |
| **consists** | `inconsistency` | stem(consist) | 2 | 9.3, 10.9 | His student Plato recorded their conversations and articulated the doctrine that the perceptible wor… |
| **objects** | `objective` | stem(object) | 2 | 9.3, 9.47 | Plato's own student Aristotle reversed the doctrine, insisting that the Forms reside within ordinary… |
| **maintaining** | `obtain` | stem(maintain) | 2 | 9.5, 9.28 | When the Western Roman Empire collapsed beneath the migrating tribes, Western Europe entered a mille… |
| **supporting** | `support` | stem(support) | 2 | 9.8, 9.33 | Medieval European builders devised a structural innovation called the flying buttress, an external s… |
| **installed** | `establish` | stem(stall) | 2 | 9.8, 9.30 | Walls relieved of that thrust could be hollowed out for enormous windows, and stained glass installe… |
| **theological** | `logical` | substring(logical) | 2 | 9.8, 9.19 | Walls relieved of that thrust could be hollowed out for enormous windows, and stained glass installe… |
| **accordingly** | `accord` | stem(accord) | 2 | 9.8, 9.55 | Theologians of the period had pronounced that light was the most refined form in which the divine co… |
| **offices** | `efficient` | stem(office) | 2 | 9.9, 10.16 | Medieval Benedictine monks structured their existence around the doctrine that work itself constitut… |
| **prevented** | `prevent` | substring(prevent) | 2 | 9.12, 9.32 | The resulting witch hunts persisted for three centuries and executed approximately eighty thousand w… |
| **double-shell** | `shell` | substring(shell) | 2 | 9.13, 9.26 | A trained goldsmith named Brunelleschi devised a revolutionary solution: a double-shell dome in whic… |
| **cadavers** | `cadaver` | stem(cadaver) | 2 | 9.14, 9.23 | Leonardo da Vinci painted the Mona Lisa during the day and dissected human cadavers in secret at nig… |
| **historians** | `historian` | stem(historian) | 2 | 9.15, 9.25 | The Flemish painter Jan van Eyck developed a refined oil painting technique in which thin glazes of … |
| **civilians** | `civil` | substring(civil) | 2 | 9.17, 10.30 | Goya documented the Napoleonic massacre of Madrid civilians in The Third of May.… |
| **recognisable** | `sable` | substring(sable) | 2 | 9.17, 9.47 | The flamenco of southern Andalusia, originally improvised by the Roma communities through stamping h… |
| **errors** | `erratic` | stem(error) | 2 | 9.23 | Medieval European authorities had prohibited the dissection of human cadavers, so European medical t… |
| **doubting** | `doubtful` | stem(doubt) | 2 | 9.24 | He shut himself into a heated chamber in Germany and methodically doubted every belief he held until… |
| **operas** | `cooperate` | stem(opera) | 2 | 9.28, 9.29 | The German Handel migrated to London, wrote commercially successful operas and oratorios, and author… |
| **authored** | `authentic` | stem(author) | 2 | 9.28, 9.36 | The German Handel migrated to London, wrote commercially successful operas and oratorios, and author… |
| **terminating** | `terminate` | stem(terminat) | 2 | 9.31, 10.17 | The French king Louis XVI was conducted to the public scaffold in Paris and beheaded by guillotine b… |
| **monarchy** | `monarch` | substring(monarch) | 2 | 9.31, 10.4 | The French king Louis XVI was conducted to the public scaffold in Paris and beheaded by guillotine b… |
| **moderates** | `modern` | stem(moderate) | 2 | 9.31, 10.31 | The revolutionary leader Robespierre, presiding over the Committee of Public Safety, dispatched seve… |
| **similarly** | `assimilate` | stem(similar) | 2 | 9.31, 10.34 | The revolutionary leader Robespierre, presiding over the Committee of Public Safety, dispatched seve… |
| **tuberculosis** | `tuber` | substring(tuber) | 2 | 9.32, 9.40 | The poet Keats, dying of tuberculosis in Rome at twenty-five, composed Ode to a Nightingale knowing … |
| **convicted** | `convict` | stem(convict) | 2 | 9.34, 10.32 | Oscar Wilde, the wittiest playwright of the century, was eventually convicted for homosexuality, sen… |
| **historically** | `prehistoric` | stem(histor) | 2 | 9.35, 10.27 | The German political economist Marx spent decades in the reading room of the British Museum drafting… |
| **deliberate** | `liberate` | substring(liberate) | 2 | 9.39, 10.20 | The Russian Tchaikovsky composed Swan Lake and The Nutcracker while concealing his homosexuality fro… |
| **cultured** | `acculturation` | stem(cultur) | 2 | 9.40, 10.20 | The German bacteriologist Koch isolated and cultured the individual pathogens responsible for tuberc… |
| **foundations** | `found` | stem(foundation) | 2 | 9.41, 10.34 | The same century redrew the foundations of classical mechanics itself: physicists rewrote the laws g… |
| **radioactive** | `radio` | substring(radio) | 2 | 9.41 | Her sustained exposure to radioactive material eventually terminated her through leukaemia, and her … |
| **electromagnetic** | `magnetic` | substring(magnetic) | 2 | 9.41 | The English experimentalist Faraday, a blacksmith's son, discovered electromagnetic induction.… |
| **patients** | `compassion` | stem(patient) | 2 | 9.44, 10.20 | The neurologist Freud encouraged his patients to recline on a couch and articulate whatever entered … |
| **consciousness** | `subconscious` | stem(conscious) | 2 | 9.44, 9.46 | The neurologist Freud encouraged his patients to recline on a couch and articulate whatever entered … |
| **operates** | `cooperate` | stem(operate) | 2 | 9.44, 9.55 | The neurologist Freud encouraged his patients to recline on a couch and articulate whatever entered … |
| **limits** | `eliminate` | stem(limit) | 2 | 9.44, 10.32 | The Austrian philosopher Wittgenstein composed the Tractatus Logico-Philosophicus to determine the p… |
| **characters** | `character` | stem(character) | 2 | 9.46, 9.50 | Woolf, in Mrs Dalloway, traced consciousness as it flickered between several characters across a sin… |
| **dismantled** | `mantle` | stem(mantl) | 2 | 9.51, 10.19 | Beneath that Protestant ethic lay centuries of medieval feudalism, in which every peasant had been b… |
| **debated** | `debate` | stem(debat) | 2 | 9.51, 10.32 | Later thinkers, drawing on a deeper radicalism, debated whether egalitarian welfare can be ethically… |
| **enlightenment** | `light` | substring(light) | 2 | 9.51, 10.4 | The Scottish enlightenment had earlier proposed altruism and benevolence as the natural ethical pair… |
| **demonstrations** | `demonstrate` | stem(demonstration) | 2 | 9.54, 10.28 | Across forty years the Berlin Wall divided a single German city into a Western capitalist half and a… |
| **sculpted** | `sculpture` | stem(sculpt) | 1 | 9.1 | The continent of Europe was sculpted, across successive ice ages, by the advance and retreat of imme… |
| **meltwater** | `water` | substring(water) | 1 | 9.1 | As the melting glaciers receded, their meltwater carved the deep narrow fjords that now penetrate th… |
| **tempered** | `temperament` | stem(temper) | 1 | 9.1 | The same collision sealed off what had once been an open passage to the Atlantic, generating the war… |
| **cross-examined** | `examine` | substring(examine) | 1 | 9.3 | Socrates roamed the Athenian agora interrogating politicians and wealthy citizens with relentless qu… |
| **shadows** | `overshadow` | stem(shadow) | 1 | 9.3 | His student Plato recorded their conversations and articulated the doctrine that the perceptible wor… |
| **polished** | `abolish` | stem(polish) | 1 | 9.3 | Across the sea in Syracuse, the engineer Archimedes leapt from his bath shouting "eureka" upon perce… |
| **mirrors** | `merit` | stem(mirror) | 1 | 9.3 | Across the sea in Syracuse, the engineer Archimedes leapt from his bath shouting "eureka" upon perce… |
| **unreinforced** | `reinforce` | strip-un | 1 | 9.4 | The Pantheon in Rome was assembled from this concrete and remains the largest unreinforced concrete … |
| **brains** | `brainstorm` | stem(brain) | 1 | 9.4 | The aqueducts that delivered fresh water to the patrician households were constructed from lead pipi… |
| **emperors** | `emperor` | stem(emperor) | 1 | 9.4 | The progressive mental deterioration evident in the late imperial decisions of certain emperors has … |
| **attributed** | `attribute` | substring(attribute) | 1 | 9.4 | The progressive mental deterioration evident in the late imperial decisions of certain emperors has … |
| **monsters** | `demonstrate` | stem(monster) | 1 | 9.5 | They illustrated the margins of their copies with whimsical doodles of small dogs and improbable mon… |
| **shallow-draft** | `draft` | substring(draft) | 1 | 9.6 | The Vikings of Scandinavia engineered a kind of long shallow-draft vessel called the longship, light… |
| **portages** | `support` | stem(portage) | 1 | 9.6 | The Vikings of Scandinavia engineered a kind of long shallow-draft vessel called the longship, light… |
| **newfoundland** | `found` | substring(found) | 1 | 9.6 | The Vikings raided the coastal monasteries of England, colonised Iceland and Greenland, and reached … |
| **short-lived** | `short` | substring(short) | 1 | 9.6 | The Vikings raided the coastal monasteries of England, colonised Iceland and Greenland, and reached … |
| **abandoning** | `abandonment` | stem(abandon) | 1 | 9.6 | The Vikings raided the coastal monasteries of England, colonised Iceland and Greenland, and reached … |
| **narratives** | `narrative` | stem(narrative) | 1 | 9.6 | Lacking any written script, the Vikings transmitted their oral history through epic narratives calle… |
| **windows** | `overshadow` | stem(window) | 1 | 9.8 | Walls relieved of that thrust could be hollowed out for enormous windows, and stained glass installe… |
| **illiterate** | `literacy` | stem(literate) | 1 | 9.8 | Walls relieved of that thrust could be hollowed out for enormous windows, and stained glass installe… |
| **architects** | `detect` | stem(architect) | 1 | 9.8 | Theologians of the period had pronounced that light was the most refined form in which the divine co… |
| **inheriting** | `heritage` | stem(herit) | 1 | 9.8 | Notre Dame de Paris required more than a century to complete, with successive generations of masons … |
| **reconnected** | `connect` | stem(connect) | 1 | 9.10 | These translated and annotated works survived in the Islamic caliphate of Andalusia in southern Spai… |
| **knights** | `night` | substring(night) | 1 | 9.11 | Their principal entertainment was the joust, in which mounted knights charged each other with long l… |
| **teachers** | `treacherous` | stem(teacher) | 1 | 9.11 | Meanwhile in Bologna, a group of law students banded together to hire their own teachers rather than… |
| **trusting** | `buttress` | stem(trust) | 1 | 9.12 | Every European peasant faced the same dilemma: continue trusting the church or treat all its doctrin… |
| **mortality** | `moral` | stem(mortal) | 1 | 9.12 | Every European peasant faced the same dilemma: continue trusting the church or treat all its doctrin… |
| **flagellants** | `ant` | stem(flagellant) | 1 | 9.12 | Some survivors organised themselves into processions of flagellants who scourged themselves through … |
| **witches** | `witch` | substring(witch) | 1 | 9.12 | Some survivors organised themselves into processions of flagellants who scourged themselves through … |
| **assisted** | `consistent` | stem(assist) | 1 | 9.12 | The resulting witch hunts persisted for three centuries and executed approximately eighty thousand w… |
| **childbirth** | `child` | substring(child) | 1 | 9.12 | The resulting witch hunts persisted for three centuries and executed approximately eighty thousand w… |
| **details** | `detailed` | stem(detail) | 1 | 9.14 | Leonardo da Vinci painted the Mona Lisa during the day and dissected human cadavers in secret at nig… |
| **designs** | `designate` | stem(design) | 1 | 9.14 | Leonardo da Vinci painted the Mona Lisa during the day and dissected human cadavers in secret at nig… |
| **helicopters** | `helicopter` | stem(helicopter) | 1 | 9.14 | Leonardo da Vinci painted the Mona Lisa during the day and dissected human cadavers in secret at nig… |
| **self-portrait** | `portrait` | substring(portrait) | 1 | 9.14 | Raphael, the youngest of the three, assembled all the major Greek philosophers in his fresco The Sch… |
| **figures** | `decipher` | stem(figure) | 1 | 9.14 | All three figures were simultaneously artists, engineers, and anatomists.… |
| **translucently** | `elucidate` | stem(translucent) | 1 | 9.15 | The Flemish painter Jan van Eyck developed a refined oil painting technique in which thin glazes of … |
| **obsessive** | `assess` | stem(obsess) | 1 | 9.15 | The German Albrecht Dürer combined Italian perspective with Northern obsessive detail, his engraving… |
| **assembling** | `assemble` | stem(assembl) | 1 | 9.15 | The German Albrecht Dürer combined Italian perspective with Northern obsessive detail, his engraving… |
| **hourglass** | `glass` | substring(glass) | 1 | 9.15 | The German Albrecht Dürer combined Italian perspective with Northern obsessive detail, his engraving… |
| **delights** | `light` | substring(light) | 1 | 9.15 | The Dutchman Hieronymus Bosch painted the triptych Garden of Earthly Delights, populated with bird-h… |
| **depicts** | `depict` | stem(depict) | 1 | 9.15 | The Dutchman Hieronymus Bosch painted the triptych Garden of Earthly Delights, populated with bird-h… |
| **novels** | `innovative` | stem(novel) | 1 | 9.17 | The Castilian writer Cervantes composed Don Quixote, in which an elderly gentleman addled by chivalr… |
| **credited** | `credible` | stem(credit) | 1 | 9.17 | The Castilian writer Cervantes composed Don Quixote, in which an elderly gentleman addled by chivalr… |
| **variations** | `vary` | stem(variation) | 1 | 9.17 | The court painter Velázquez inserted himself into his own canvas in Las Meninas, generating a visual… |
| **incomplete** | `accomplish` | stem(complete) | 1 | 9.17 | The Catalan architect Gaudí designed the Sagrada Familia with melting organic forms whose constructi… |
| **indulgences** | `indulgence` | stem(dulgence) | 1 | 9.18 | The implication, when it arrived, took the form of a German friar named Martin Luther nailing ninety… |
| **scholarly** | `scholar` | stem(scholar) | 1 | 9.18 | He had intended a scholarly debate.… |
| **orbited** | `orbit` | stem(orbit) | 1 | 9.19 | The Polish astronomer Copernicus calculated, against every philosophical and theological intuition o… |
| **phases** | `emphasize` | stem(phase) | 1 | 9.19 | The Italian astronomer Galileo, equipped with an improved telescope, observed the moons of Jupiter a… |
| **sonnets** | `sonnet` | stem(sonnet) | 1 | 9.20 | The son of a small-town glove-maker grew up to write thirty-seven plays and one hundred fifty-four s… |
| **shorthand** | `short` | substring(short) | 1 | 9.20 | His lines have become idiomatic shorthand for entire human conditions.… |
| **proposals** | `proposal` | stem(proposal) | 1 | 9.20 | Meanwhile his sovereign, Elizabeth I, refused all proposals of marriage and declared herself wedded … |
| **affairs** | `fair` | stem(affair) | 1 | 9.20 | Meanwhile his sovereign, Elizabeth I, refused all proposals of marriage and declared herself wedded … |
| **animalcules** | `animal` | substring(animal) | 1 | 9.21 | The Delft cloth merchant Anton van Leeuwenhoek ground his own glass lenses and constructed the most … |
| **resolution** | `solvent` | strip-re | 1 | 9.21 | He sketched these creatures and posted his drawings to the Royal Society in London, where the entire… |
| **superstructure** | `structure` | substring(structure) | 1 | 9.21 | All this occurred under the financial superstructure of the Dutch East India Company, the first mult… |
| **joint-stock** | `joint` | substring(joint) | 1 | 9.21 | All this occurred under the financial superstructure of the Dutch East India Company, the first mult… |
| **spotlight** | `light` | substring(light) | 1 | 9.22 | The Italian Caravaggio illuminated his subjects as if a theatre spotlight had cracked the surroundin… |
| **self-portraits** | `portrait` | substring(portrait) | 1 | 9.22 | The Dutch Rembrandt produced more than a hundred self-portraits across his lifetime, unflinchingly d… |
| **prohibited** | `exhibit` | stem(prohibit) | 1 | 9.23 | Medieval European authorities had prohibited the dissection of human cadavers, so European medical t… |
| **reproducing** | `produce` | stem(produc) | 1 | 9.23 | Medieval European authorities had prohibited the dissection of human cadavers, so European medical t… |
| **retrieved** | `retrieval` | stem(triev) | 1 | 9.23 | The Flemish anatomist Vesalius, working at the medical school in Padua, retrieved corpses from gallo… |
| **corrected** | `redirect` | stem(correct) | 1 | 9.23 | The Flemish anatomist Vesalius, working at the medical school in Padua, retrieved corpses from gallo… |
| **illustrating** | `illustrate` | stem(lustrat) | 1 | 9.23 | The Flemish anatomist Vesalius, working at the medical school in Padua, retrieved corpses from gallo… |
| **replenished** | `deplete` | stem(plenish) | 1 | 9.23 | The English physician Harvey measured the volume of blood pumped per minute by the heart, demonstrat… |
| **adopted** | `adapt` | stem(adopt) | 1 | 9.24 | The French philosopher Descartes adopted the opposite approach.… |
| **methodically** | `methodology` | stem(method) | 1 | 9.24 | He shut himself into a heated chamber in Germany and methodically doubted every belief he held until… |
| **doubted** | `doubtful` | stem(doubt) | 1 | 9.24 | He shut himself into a heated chamber in Germany and methodically doubted every belief he held until… |
| **rationalist** | `rational` | substring(rational) | 1 | 9.24 | The statement "I think, therefore I am" thereby became the founding axiom of modern rationalism, and… |
| **gravitation** | `gravity` | stem-of-family | 1 | 9.25 | When the bubonic plague closed Cambridge, a young undergraduate named Isaac Newton retreated to the … |
| **differential** | `different` | substring(different) | 1 | 9.25 | When the bubonic plague closed Cambridge, a young undergraduate named Isaac Newton retreated to the … |
| **demolishing** | `abolish` | stem(demolish) | 1 | 9.26 | A bakery on Pudding Lane caught fire one night and the resulting blaze consumed two thirds of the me… |
| **enchained** | `chain` | substring(chain) | 1 | 9.27 | Rousseau argued in The Social Contract that all human beings are born free yet are nevertheless univ… |
| **derives** | `derive` | stem(derive) | 1 | 9.27 | Rousseau argued in The Social Contract that all human beings are born free yet are nevertheless univ… |
| **coordinates** | `coordinate` | stem(coordinate) | 1 | 9.27 | The Scottish economist Adam Smith, working in parallel, articulated the doctrine of the invisible ha… |
| **cantatas** | `cantata` | stem(cantata) | 1 | 9.28 | The German Bach wrote several hundred cantatas across his career as a provincial church musician, dy… |
| **violins** | `violate` | stem(violin) | 1 | 9.28 | The Venetian Vivaldi composed The Four Seasons, in which violins and orchestra paint the bird-song o… |
| **orchestra** | `chest` | substring(chest) | 1 | 9.28 | The Venetian Vivaldi composed The Four Seasons, in which violins and orchestra paint the bird-song o… |
| **composers** | `compose` | stem(composer) | 1 | 9.29 | The three composers who consolidated the classical symphony all converged on imperial Vienna across … |
| **workshops** | `hop` | stem(workshop) | 1 | 9.30 | The spinning jenny enabled one worker to operate eight spindles simultaneously, and factory owners p… |
| **aristocrats** | `bureaucratic` | stem(aristocrat) | 1 | 9.31 | The revolutionary leader Robespierre, presiding over the Committee of Public Safety, dispatched seve… |
| **priests** | `interpret` | stem(priest) | 1 | 9.31 | The revolutionary leader Robespierre, presiding over the Committee of Public Safety, dispatched seve… |
| **waterloo** | `water` | substring(water) | 1 | 9.31 | Into the resulting vacuum stepped a short Corsican artillery officer named Napoleon, who crowned him… |
| **assembles** | `assemble` | stem(assemble) | 1 | 9.32 | The eighteen-year-old Mary Shelley produced the story of a scientist who assembles a living creature… |
| **nightingale** | `night` | substring(night) | 1 | 9.32 | The poet Keats, dying of tuberculosis in Rome at twenty-five, composed Ode to a Nightingale knowing … |
| **theoretically** | `theorem` | stem(theoret) | 1 | 9.33 | A twelve-year-old English girl named Mary Anning, daughter of a furniture repairman on the south coa… |
| **polarised** | `polar` | substring(polar) | 1 | 9.33 | The implication, that humans had emerged the same way, polarised Britain irreversibly.… |
| **subtleties** | `subtle` | substring(subtle) | 1 | 9.34 | Jane Austen, writing in the parlour of a rural rectory, articulated the layered subtleties of the co… |
| **refuses** | `refuse` | substring(refuse) | 1 | 9.34 | The Brontë sisters, raised in a Yorkshire parsonage, produced Jane Eyre, the chronicle of a governes… |
| **laboured** | `labour` | stem(labour) | 1 | 9.34 | Dickens, who had himself laboured in a factory as a child, wrote Oliver Twist and A Tale of Two Citi… |
| **manchester** | `chest` | substring(chest) | 1 | 9.35 | His friend Engels, whose family owned a Manchester textile factory, financed Marx's entire research … |
| **profits** | `proficiency` | stem(profit) | 1 | 9.35 | His friend Engels, whose family owned a Manchester textile factory, financed Marx's entire research … |
| **dialectical** | `dialect` | stem(dialect) | 1 | 9.35 | The earlier German philosopher Hegel had proposed that history advanced through dialectical oppositi… |
| **synthesising** | `synthetic` | stem(synthesis) | 1 | 9.35 | The earlier German philosopher Hegel had proposed that history advanced through dialectical oppositi… |
| **wheels** | `rotation` | stem(wheel) | 1 | 9.36 | The Russian aristocrat Tolstoy left his estate to labour alongside the peasants in his own fields, w… |
| **articulates** | `articulate` | stem(articulate) | 1 | 9.36 | Crime and Punishment dissects the mental collapse of a poor student who murders a pawnbroker, while … |
| **bare-chested** | `chest` | substring(chest) | 1 | 9.37 | Delacroix embraced romantic intensity in Liberty Leading the People, in which an allegorical woman b… |
| **harvested** | `harvest` | stem(harvest) | 1 | 9.37 | Millet painted The Gleaners and The Angelus, in which bent peasants gathering missed grain from harv… |
| **repainted** | `painting` | stem(paint) | 1 | 9.38 | Monet repainted his garden water lilies hundreds of times across his old age, his fading eyesight pu… |
| **nocturnes** | `nocturne` | stem(nocturne) | 1 | 9.39 | The Polish émigré Chopin composed piano nocturnes of an unrepeatable melancholy and conducted a famo… |
| **unrepeatable** | `repeat` | stem(repeat) | 1 | 9.39 | The Polish émigré Chopin composed piano nocturnes of an unrepeatable melancholy and conducted a famo… |
| **cycles** | `recycle` | stem(cycle) | 1 | 9.39 | The German Wagner constructed massive operatic cycles of his own design, the four-part Ring of the N… |
| **pathogens** | `pathology` | stem(pathogen) | 1 | 9.40 | The German bacteriologist Koch isolated and cultured the individual pathogens responsible for tuberc… |
| **causes** | `cautious` | stem(cause) | 1 | 9.40 | The combined work of Pasteur and Koch transformed medicine from a craft of empirical guesswork into … |
| **prizes** | `comprise` | stem(prize) | 1 | 9.41 | The Polish-French chemist Marie Curie isolated the element radium from several tons of uranium ore i… |
| **disciplines** | `discipline` | stem(cipline) | 1 | 9.41 | The Polish-French chemist Marie Curie isolated the element radium from several tons of uranium ore i… |
| **governing** | `governance` | stem(govern) | 1 | 9.41 | The same century redrew the foundations of classical mechanics itself: physicists rewrote the laws g… |
| **equations** | `equivalent` | stem(equation) | 1 | 9.41 | The Scottish theorist Maxwell condensed Faraday's experimental findings into four elegant equations … |
| **experimenter** | `experiment` | stem(experiment) | 1 | 9.41 | The German experimenter Hertz demonstrated those waves directly.… |
| **virtues** | `virtue` | stem(virtue) | 1 | 9.42 | Modern team sports emerged largely from the public schools of nineteenth-century England, where mast… |
| **codifying** | `decode` | stem(codify) | 1 | 9.42 | Representatives of several London schools convened in a pub and agreed on a single rulebook for foot… |
| **pupils** | `discipline` | stem(pupil) | 1 | 9.42 | Pupils at the school of Rugby, frustrated with the new prohibition, simply picked up the ball and ra… |
| **representing** | `misrepresent` | stem(present) | 1 | 9.42 | The French baron Coubertin, having read about the ancient Olympic Games, devised a modern revival in… |
| **legally** | `eligible` | stem(legal) | 1 | 9.43 | The Belgian king Leopold II personally acquired sovereignty over a vast territory in central Africa,… |
| **privately** | `privatization` | stem(private) | 1 | 9.43 | He converted the entire equatorial rainforest into a privately owned rubber plantation and compelled… |
| **punished** | `punishment` | stem(punish) | 1 | 9.43 | He converted the entire equatorial rainforest into a privately owned rubber plantation and compelled… |
| **photographs** | `demographic` | stem(photograph) | 1 | 9.43 | Photographs of severed hands stacked in pyramids eventually reached the international press, generat… |
| **humanitarian** | `human` | substring(human) | 1 | 9.43 | Photographs of severed hands stacked in pyramids eventually reached the international press, generat… |
| **filtering** | `falter` | stem(filter) | 1 | 9.44 | The neurologist Freud encouraged his patients to recline on a couch and articulate whatever entered … |
| **recurrent** | `concur` | stem(current) | 1 | 9.44 | The neurologist Freud encouraged his patients to recline on a couch and articulate whatever entered … |
| **tractatus** | `tract` | substring(tract) | 1 | 9.44 | The Austrian philosopher Wittgenstein composed the Tractatus Logico-Philosophicus to determine the p… |
| **logico-philosophicus** | `logic` | substring(logic) | 1 | 9.44 | The Austrian philosopher Wittgenstein composed the Tractatus Logico-Philosophicus to determine the p… |
| **fronts** | `prefrontal` | stem(front) | 1 | 9.44 | Three independent attempts on three independent fronts to articulate the same question: what is the … |
| **culturally** | `acculturation` | stem(cultural) | 1 | 9.45 | After centuries of English domination and the potato famine that had starved a million Irish to deat… |
| **half-perceived** | `perceive` | substring(perceive) | 1 | 9.45 | A revival movement led by the poet Yeats recovered the surviving Celtic mythology of the warrior Cú … |
| **provoking** | `provoke` | stem(provok) | 1 | 9.45 | The dramatist Synge wrote The Playboy of the Western World in the spoken dialect of rural Connacht, … |
| **travelling** | `travel` | substring(travel) | 1 | 9.46 | The Czech clerk Kafka, writing in German at his insurance office, produced The Metamorphosis, in whi… |
| **narrating** | `narrative` | stem(narrat) | 1 | 9.46 | Joyce wrote Ulysses, narrating a single day in Dublin across seven hundred pages, each chapter deplo… |
| **flickered** | `conflict` | stem(flicker) | 1 | 9.46 | Woolf, in Mrs Dalloway, traced consciousness as it flickered between several characters across a sin… |
| **soundproofed** | `proof` | substring(proof) | 1 | 9.46 | Proust composed seven volumes of In Search of Lost Time from a soundproofed bedroom, the entire proj… |
| **aggressively** | `aggression` | stem(aggress) | 1 | 9.47 | Twentieth-century painting, the most aggressively avant-garde movement in any art form, demolished f… |
| **depicting** | `depict` | stem(depict) | 1 | 9.47 | The Spaniard Picasso invented Cubism, depicting the same object from several angles simultaneously o… |
| **dream-logic** | `logic` | substring(logic) | 1 | 9.47 | The Catalan Dalí painted melting clocks draped across desert rocks in The Persistence of Memory, est… |
| **synthesised** | `synthetic` | stem(synthesis) | 1 | 9.47 | The German Bauhaus school synthesised these aesthetic experiments with industrial production, articu… |
| **opposing** | `oppose` | stem(oppos) | 1 | 9.48 | The opposing armies on the Western Front therefore burrowed into parallel trenches and fought the sa… |
| **trenches** | `trench` | substring(trench) | 1 | 9.48 | The opposing armies on the Western Front therefore burrowed into parallel trenches and fought the sa… |
| **hyperinflation** | `inflation` | substring(inflation) | 1 | 9.49 | Post-war German hyperinflation rendered the currency so worthless that a loaf of bread required a wh… |
| **newspaper** | `paper` | substring(paper) | 1 | 9.49 | An Austrian-born former corporal named Hitler exploited the resulting public bitterness to seize pol… |
| **exterminated** | `terminate` | substring(terminate) | 1 | 9.49 | An Austrian-born former corporal named Hitler exploited the resulting public bitterness to seize pol… |
| **developing** | `redevelopment` | stem(develop) | 1 | 9.49 | Albert Einstein, who was himself Jewish, escaped to America and warned the American president Roosev… |
| **mass-energy** | `energy` | substring(energy) | 1 | 9.49 | The American Manhattan Project converted Einstein's mass-energy equivalence into the atomic bombs th… |
| **actors** | `exact` | stem(actor) | 1 | 9.50 | Italian Neorealism took the camera out of the studio into the rubble of the bombed cities, casting n… |
| **breathless** | `breathing` | stem(breath) | 1 | 9.50 | Godard fragmented Breathless with jump cuts that violated every continuity rule of classical editing… |
| **inherits** | `heritage` | stem(herit) | 1 | 9.50 | Every independent film made anywhere on the planet across the following half-century inherits someth… |
| **pre-modern** | `modern` | substring(modern) | 1 | 9.51 | Modern social theory built itself from the wreckage of pre-modern Europe.… |
| **specifically** | `specimen` | stem(specif) | 1 | 9.51 | The German sociologist Weber argued in The Protestant Ethic and the Spirit of Capitalism that capita… |
| **unintelligible** | `intelligible` | strip-un | 1 | 9.51 | Beneath that Protestant ethic lay centuries of medieval feudalism, in which every peasant had been b… |
| **conformed** | `conformity` | stem(conform) | 1 | 9.51 | The French sociologist Durkheim demonstrated through statistical analysis of suicide that even the m… |
| **marginalises** | `marginal` | substring(marginal) | 1 | 9.51 | The French sociologist Durkheim demonstrated through statistical analysis of suicide that even the m… |
| **maximise** | `maximize` | stem(maxim) | 1 | 9.51 | The English philosopher Bentham articulated utilitarianism, the doctrine that public policy should m… |
| **marginalisation** | `marginal` | substring(marginal) | 1 | 9.51 | Later thinkers, drawing on a deeper radicalism, debated whether egalitarian welfare can be ethically… |
| **accumulates** | `accumulate` | stem(accumulate) | 1 | 9.51 | Later thinkers, drawing on a deeper radicalism, debated whether egalitarian welfare can be ethically… |
| **deficits** | `deficiency` | stem(deficit) | 1 | 9.51 | The English economist Keynes proposed in his General Theory of Employment, Interest, and Money that … |
| **recessions** | `recession` | substring(recession) | 1 | 9.51 | The English economist Keynes proposed in his General Theory of Employment, Interest, and Money that … |
| **marginalised** | `marginal` | substring(marginal) | 1 | 9.51 | Contemporary social theory recognises that the empowerment of marginalised populations, not merely t… |
| **unconstrained** | `restrain` | stem(constrain) | 1 | 9.51 | Contemporary social theory recognises that the empowerment of marginalised populations, not merely t… |
| **emphasised** | `emphasize` | stem(emphasis) | 1 | 9.52 | The resulting design philosophy emphasised clean lines, unembellished pale timber, and the minimum v… |
| **ornamentation** | `ornament` | substring(ornament) | 1 | 9.52 | The resulting design philosophy emphasised clean lines, unembellished pale timber, and the minimum v… |
| **designates** | `designate` | stem(designate) | 1 | 9.52 | The Danish concept of hygge designates the small domestic ritual of candles, blankets, hot drinks, a… |
| **candles** | `kindle` | stem(candle) | 1 | 9.52 | The Danish concept of hygge designates the small domestic ritual of candles, blankets, hot drinks, a… |
| **converts** | `avert` | stem(convert) | 1 | 9.52 | The Danish concept of hygge designates the small domestic ritual of candles, blankets, hot drinks, a… |
| **ignites** | `ignite` | stem(ignite) | 1 | 9.52 | The polar sky above them ignites periodically with the green and violet curtains of the aurora, and … |
| **religions** | `oblige` | stem(ligion) | 1 | 9.53 | The federation of Yugoslavia held together six south Slavic republics, four languages, and three rel… |
| **besieged** | `siege` | substring(siege) | 1 | 9.53 | Sarajevo, the same city in which the First World War had been ignited, was now besieged by Serbian a… |
| **airpower** | `power` | substring(power) | 1 | 9.53 | In Kosovo the Albanian population was driven from its homes until NATO airpower forced the Serbian m… |
| **disintegration** | `integrate` | strip-dis | 1 | 9.53 | Roughly one hundred and fifty thousand died across the entire disintegration, and the borders the wa… |
| **unstable** | `establish` | strip-un | 1 | 9.53 | Roughly one hundred and fifty thousand died across the entire disintegration, and the borders the wa… |
| **unable** | `enable` | strip-un | 1 | 9.54 | Across forty years the Berlin Wall divided a single German city into a Western capitalist half and a… |
| **suspended** | `impending` | stem(suspend) | 1 | 9.54 | Across forty years the Berlin Wall divided a single German city into a Western capitalist half and a… |
| **crowds** | `overcrowded` | stem(crowd) | 1 | 9.54 | Across forty years the Berlin Wall divided a single German city into a Western capitalist half and a… |
| **customs** | `consumerism` | stem(custom) | 1 | 9.54 | The collapse of the Soviet system that followed permitted Western Europe to organise itself into the… |
| **adopting** | `adapt` | stem(adopt) | 1 | 9.54 | The collapse of the Soviet system that followed permitted Western Europe to organise itself into the… |
| **linguist** | `linguistics` | stem-of-family | 1 | 9.55 | The Swiss linguist Ferdinand de Saussure articulated, in lectures published only after his death, th… |
| **lectures** | `intelligent` | stem(lecture) | 1 | 9.55 | The Swiss linguist Ferdinand de Saussure articulated, in lectures published only after his death, th… |
| **consequences** | `frequent` | stem(consequence) | 1 | 9.55 | The American Noam Chomsky proposed, with worldwide consequences, that every human infant arrives wit… |
| **lexicons** | `lexicon` | stem(lexicon) | 1 | 9.55 | The lexicon of each language remains the most resistant element to translation; bilingual children n… |
| **switching** | `witch` | substring(witch) | 1 | 9.55 | The lexicon of each language remains the most resistant element to translation; bilingual children n… |

## Chapter 10 (187 words)

| Word | Parent | Path | Hits | Sections | Sample sentence |
|---|---|---|---:|---|---|
| **electricity** | `hydroelectric` | stem(electric) | 3 | 10.13, 10.22 | He insisted that direct electrical current was the only safe form of household electricity and toure… |
| **methods** | `methodology` | stem(method) | 3 | 10.19, 10.33, 10.36 | The behaviourist paradigm of these experiments dominated American psychology for decades, treating i… |
| **accounting** | `encounter` | stem(account) | 3 | 10.33 | The MBA curriculum codified financial accounting, marginal pricing, investment analysis, and the rig… |
| **materials** | `materialism` | stem(material) | 3 | 10.37 | The American materials sciences of the twentieth century produced inventions that quietly restructur… |
| **arrival** | `rival` | substring(rival) | 2 | 10.1, 10.5 | The mammoth, the giant ground sloth, the sabre-toothed cat, the giant short-faced bear, the American… |
| **canals** | `canal` | stem(canal) | 2 | 10.3, 10.36 | In the high valley of central Mexico the Aztec people constructed the floating city of Tenochtitlan,… |
| **lightning** | `light` | substring(light) | 2 | 10.9 | Benjamin Franklin flew a kite into a thunderstorm with a key attached to the string, demonstrating t… |
| **representation** | `misrepresent` | strip-re | 2 | 10.9, 10.27 | A few decades later, when the British Parliament imposed yet another tax on the American colonies wi… |
| **grounds** | `background` | stem(ground) | 2 | 10.11, 10.32 | The northern states, having industrialised earlier, no longer relied on slavery and increasingly opp… |
| **equality** | `equivalent` | stem(equal) | 2 | 10.11 | Legal abolition did not generate equality.… |
| **samples** | `sample` | stem(sample) | 2 | 10.12, 10.18 | Bronx Black teenagers eventually layered spoken rhyme over looped instrumental samples and generated… |
| **alternating** | `alter` | stem(alternat) | 2 | 10.13 | His Serbian-born former assistant Nikola Tesla, a famously clever experimentalist working with the m… |
| **incentives** | `incentive` | substring(incentive) | 2 | 10.19, 10.33 | Skinner's behaviourism trained pigeons to perform sequential behaviours through reinforcement schedu… |
| **participants** | `participate` | stem(participant) | 2 | 10.19 | Milgram instructed ordinary participants to administer escalating electrical shocks to another perso… |
| **guards** | `regard` | stem(guard) | 2 | 10.19 | Zimbardo divided Stanford undergraduates into mock prisoners and mock guards, and within a week the … |
| **computers** | `input` | stem(computer) | 2 | 10.21 | Several young engineers assembled the first commercially viable personal computers from kits in thei… |
| **designing** | `designate` | stem(design) | 2 | 10.26 | The American architect Frank Lloyd Wright moved in the opposite direction, designing the residence F… |
| **sciences** | `subconscious` | stem(science) | 2 | 10.27, 10.37 | The Scholastic Aptitude Test became the standardised gateway through which American adolescents are … |
| **transgender** | `gender` | substring(gender) | 2 | 10.29 | A confrontation between police and the patrons of a Manhattan bar called the Stonewall Inn precipita… |
| **measures** | `immense` | stem(measure) | 2 | 10.31, 10.33 | The body's homeostasis is maintained by a thousand small feedback loops that the conscious mind neve… |
| **superseded** | `supersede` | substring(supersede) | 2 | 10.33, 10.37 | Outdated and superficial accounting methods have been progressively superseded by software systems t… |
| **automatically** | `autonomous` | stem(automat) | 2 | 10.33, 10.34 | Outdated and superficial accounting methods have been progressively superseded by software systems t… |
| **parameters** | `barometer` | stem(parameter) | 2 | 10.34 | The matrix of numerical parameters underlying every machine-learning model is similarly recursive, w… |
| **implemented** | `implement` | substring(implement) | 2 | 10.35, 10.36 | Barcelona's neighbouring superblock districts implemented the same principle across several neighbou… |
| **sabre-toothed** | `toothed` | substring(toothed) | 1 | 10.1 | The mammoth, the giant ground sloth, the sabre-toothed cat, the giant short-faced bear, the American… |
| **short-faced** | `short` | substring(short) | 1 | 10.1 | The mammoth, the giant ground sloth, the sabre-toothed cat, the giant short-faced bear, the American… |
| **glyphs** | `glyph` | stem(glyph) | 1 | 10.2 | The Maya constructed stepped stone pyramids that ascended above the surrounding canopy, devised a wr… |
| **appearances** | `apparent` | stem(appearance) | 1 | 10.2 | Their astronomers had calculated the orbit of Venus with sufficient accuracy to predict its appearan… |
| **reclaimed** | `claim` | stem(claim) | 1 | 10.2 | The population dispersed into smaller communities and the surrounding jungle reclaimed the platforms… |
| **accounted** | `encounter` | stem(account) | 1 | 10.2 | Archaeologists continue to debate whether drought, internal warfare, ecological collapse, or some co… |
| **causeways** | `cautious` | stem(causeway) | 1 | 10.3 | In the high valley of central Mexico the Aztec people constructed the floating city of Tenochtitlan,… |
| **descended** | `ascend` | stem(descend) | 1 | 10.4 | The American political experiment, in this sense, descended from indigenous political imagination as… |
| **intercepting** | `exceptional` | stem(tercept) | 1 | 10.5 | The Rocky Mountains rise as a vast spine along the western interior of North America, intercepting t… |
| **overwinter** | `winter` | strip-over | 1 | 10.5 | They depart Canada and the northern United States, fly four thousand kilometres south to a small clu… |
| **depressions** | `depress` | stem(depression) | 1 | 10.6 | Five enormous freshwater lakes occupy the basin between the United States and Canada, the remnants o… |
| **connects** | `connect` | stem(connect) | 1 | 10.6 | The Niagara River connects Lake Erie to Lake Ontario, descending across a sheer cliff at Niagara Fal… |
| **descending** | `ascend` | stem(descend) | 1 | 10.6 | The Niagara River connects Lake Erie to Lake Ontario, descending across a sheer cliff at Niagara Fal… |
| **erodes** | `corrode` | stem(erode) | 1 | 10.6 | The cliff itself is gradually retreating upstream as the falling water erodes the rim, and at the pr… |
| **mounded** | `mound` | stem(mound) | 1 | 10.6 | The whole landscape from Quebec to Minnesota still bears the scars of glacial scouring: smoothed bed… |
| **drumlins** | `drumlin` | stem(drumlin) | 1 | 10.6 | The whole landscape from Quebec to Minnesota still bears the scars of glacial scouring: smoothed bed… |
| **supervolcano** | `volcano` | substring(volcano) | 1 | 10.7 | The Yellowstone Plateau, further north, conceals beneath its surface a supervolcano whose magma cham… |
| **pulses** | `compel` | stem(pulse) | 1 | 10.7 | The Yellowstone Plateau, further north, conceals beneath its surface a supervolcano whose magma cham… |
| **geysers** | `geyser` | stem(geyser) | 1 | 10.7 | The Yellowstone Plateau, further north, conceals beneath its surface a supervolcano whose magma cham… |
| **practise** | `pragmatic` | stem(pract) | 1 | 10.8 | A small group of English religious dissenters called Pilgrims sailed westward across the Atlantic on… |
| **shellfish** | `shell` | substring(shell) | 1 | 10.8 | The survivors were tutored through the following spring by the local Wampanoag people, who taught th… |
| **ritualised** | `ritual` | substring(ritual) | 1 | 10.8 | At the autumn harvest the two communities convened a shared feast to acknowledge a year of survival,… |
| **thunderstorm** | `storm` | substring(storm) | 1 | 10.9 | Benjamin Franklin flew a kite into a thunderstorm with a key attached to the string, demonstrating t… |
| **attached** | `detach` | stem(attach) | 1 | 10.9 | Benjamin Franklin flew a kite into a thunderstorm with a key attached to the string, demonstrating t… |
| **created** | `creativity` | stem(creat) | 1 | 10.9 | The resulting confrontation escalated into the American Revolutionary War, and the lawyer Thomas Jef… |
| **prospectors** | `prospect` | substring(prospect) | 1 | 10.10 | Word that gold had been discovered in California provoked hundreds of thousands of prospectors to mi… |
| **transforming** | `transform` | stem(transform) | 1 | 10.10 | Word that gold had been discovered in California provoked hundreds of thousands of prospectors to mi… |
| **disenfranchisement** | `franchise` | substring(franchise) | 1 | 10.11 | Black Americans endured another full century of segregation, lynching, and disenfranchisement before… |
| **labouring** | `labour` | stem(labour) | 1 | 10.12 | The work songs of enslaved Africans labouring in cotton fields, the call-and-response hollers that s… |
| **hollers** | `holler` | stem(holler) | 1 | 10.12 | The work songs of enslaved Africans labouring in cotton fields, the call-and-response hollers that s… |
| **spirituals** | `ritual` | substring(ritual) | 1 | 10.12 | The work songs of enslaved Africans labouring in cotton fields, the call-and-response hollers that s… |
| **senses** | `consensus` | stem(sense) | 1 | 10.12 | The white singer Elvis Presley adapted Black rhythm and blues into the rock and roll that made an en… |
| **descends** | `ascend` | stem(descend) | 1 | 10.12 | Every contemporary popular song descends from a field holler.… |
| **incandescent** | `descent` | substring(descent) | 1 | 10.13 | The American inventor Edison opened a research laboratory in New Jersey and generated the first comm… |
| **patents** | `patent` | stem(patent) | 1 | 10.13 | The American inventor Edison opened a research laboratory in New Jersey and generated the first comm… |
| **dangers** | `endanger` | stem(danger) | 1 | 10.13 | He insisted that direct electrical current was the only safe form of household electricity and toure… |
| **rival's** | `rival` | substring(rival) | 1 | 10.13 | He insisted that direct electrical current was the only safe form of household electricity and toure… |
| **manufacturer** | `manufacturing` | stem(manufactur) | 1 | 10.13 | His Serbian-born former assistant Nikola Tesla, a famously clever experimentalist working with the m… |
| **powered** | `power` | stem(power) | 1 | 10.14 | The Wright brothers, who repaired bicycles in Ohio for a living, conducted patient aerodynamic exper… |
| **labourer** | `labour` | stem(labour) | 1 | 10.15 | Andrew Carnegie migrated as a child from Scotland to the Pittsburgh steel mills, started as a textil… |
| **redistribution** | `contribution` | strip-re | 1 | 10.15 | Yet both ultimately donated the majority of their immense fortunes to founding libraries, universiti… |
| **accumulations** | `accumulate` | stem(accumulation) | 1 | 10.15 | Yet both ultimately donated the majority of their immense fortunes to founding libraries, universiti… |
| **elected** | `eligible` | stem(elect) | 1 | 10.16 | The newly elected president Franklin Roosevelt launched a programme called the New Deal in which the… |
| **projects** | `conjecture` | stem(project) | 1 | 10.16 | The newly elected president Franklin Roosevelt launched a programme called the New Deal in which the… |
| **superpower** | `power` | substring(power) | 1 | 10.17 | Every superpower confrontation since has been conducted in the perpetual awareness that nuclear weap… |
| **astronauts** | `astronaut` | stem(astronaut) | 1 | 10.18 | When the Soviet Union launched the first artificial satellite into low Earth orbit and the first cos… |
| **probes** | `probe` | stem(probe) | 1 | 10.18 | NASA also dispatched the Voyager probes outward past Jupiter and Saturn and out of the solar system … |
| **gold-plated** | `plate` | substring(plate) | 1 | 10.18 | Each probe carries a gold-plated phonograph record encoded with greetings in fifty-five human langua… |
| **skinner's** | `inner` | substring(inner) | 1 | 10.19 | Skinner's behaviourism trained pigeons to perform sequential behaviours through reinforcement schedu… |
| **pigeons** | `pigeon` | stem(pigeon) | 1 | 10.19 | Skinner's behaviourism trained pigeons to perform sequential behaviours through reinforcement schedu… |
| **schedules** | `schedule` | stem(schedule) | 1 | 10.19 | Skinner's behaviourism trained pigeons to perform sequential behaviours through reinforcement schedu… |
| **instructed** | `construe` | stem(struct) | 1 | 10.19 | Milgram instructed ordinary participants to administer escalating electrical shocks to another perso… |
| **shocks** | `shock` | stem(shock) | 1 | 10.19 | Milgram instructed ordinary participants to administer escalating electrical shocks to another perso… |
| **life-outcome** | `outcome` | substring(outcome) | 1 | 10.19 | The marshmallow study tracked children who could delay gratification against those who could not, fi… |
| **differences** | `indifference` | stem(difference) | 1 | 10.19 | The marshmallow study tracked children who could delay gratification against those who could not, fi… |
| **consider** | `considerable` | stem-of-family | 1 | 10.19 | The behaviourist paradigm of these experiments dominated American psychology for decades, treating i… |
| **biomedical** | `biome` | substring(biome) | 1 | 10.20 | Across the following half-century, American biomedical research generated the polio vaccine develope… |
| **once-terminal** | `terminal` | substring(terminal) | 1 | 10.20 | Across the following half-century, American biomedical research generated the polio vaccine develope… |
| **hormone-replacement** | `hormone` | substring(hormone) | 1 | 10.20 | Across the following half-century, American biomedical research generated the polio vaccine develope… |
| **protocols** | `protocol` | stem(protocol) | 1 | 10.20 | Across the following half-century, American biomedical research generated the polio vaccine develope… |
| **vaccines** | `vaccination` | stem(vaccine) | 1 | 10.20 | Across the following half-century, American biomedical research generated the polio vaccine develope… |
| **pathogen's** | `pathogen` | substring(pathogen) | 1 | 10.20 | Across the following half-century, American biomedical research generated the polio vaccine develope… |
| **immortal** | `moral` | strip-im | 1 | 10.20 | Across the following half-century, American biomedical research generated the polio vaccine develope… |
| **gene-editing** | `editing` | substring(editing) | 1 | 10.20 | Across the following half-century, American biomedical research generated the polio vaccine develope… |
| **traits** | `portrait` | stem(trait) | 1 | 10.20 | Across the following half-century, American biomedical research generated the polio vaccine develope… |
| **orchards** | `orchard` | stem(orchard) | 1 | 10.21 | A region of small fruit orchards south of San Francisco transformed across a few decades into the te… |
| **technological** | `logical` | substring(logical) | 1 | 10.21 | A region of small fruit orchards south of San Francisco transformed across a few decades into the te… |
| **computing** | `input` | stem(comput) | 1 | 10.21 | The cumulative effect across roughly two decades was to migrate computing from government laboratori… |
| **integrating** | `integrate` | stem(tegrat) | 1 | 10.22 | Steve Jobs returned to Apple after a decade of exile and presented the iPhone, integrating a touch-s… |
| **conducting** | `deduce` | stem(conduct) | 1 | 10.22 | Within a decade nearly every adult on the planet was conducting daily life through a similar device.… |
| **algorithms** | `algorithm` | stem(algorithm) | 1 | 10.22 | Google indexed the entire navigable Web and continuously enhanced its ranking algorithms, converting… |
| **assisting** | `consistent` | stem(assist) | 1 | 10.22 | American research laboratories then trained large language models on virtually the entire accessible… |
| **training** | `restrain` | stem(train) | 1 | 10.22 | The computational scale of each training run is measured in gigawatts of electricity, and the underl… |
| **virtualisation** | `virtual` | substring(virtual) | 1 | 10.22 | The computational scale of each training run is measured in gigawatts of electricity, and the underl… |
| **instances** | `substantial` | stem(stance) | 1 | 10.22 | The computational scale of each training run is measured in gigawatts of electricity, and the underl… |
| **debating** | `debate` | stem(debat) | 1 | 10.22 | OpenAI's ChatGPT and Anthropic's Claude eventually presented these capabilities to the general publi… |
| **sprayed** | `spread` | stem(spray) | 1 | 10.23 | The marine biologist Rachel Carson published a book demonstrating that the pesticide DDT, sprayed li… |
| **liberally** | `liberate` | stem(liberal) | 1 | 10.23 | The marine biologist Rachel Carson published a book demonstrating that the pesticide DDT, sprayed li… |
| **honeybees** | `honeybee` | stem(honeybee) | 1 | 10.23 | Meanwhile honeybees have been disappearing from American commercial pollination operations through a… |
| **brushes** | `brush` | substring(brush) | 1 | 10.24 | Jackson Pollock laid an immense canvas on his studio floor and dripped industrial enamel paint from … |
| **expressionism** | `express` | substring(express) | 1 | 10.24 | Jackson Pollock laid an immense canvas on his studio floor and dripped industrial enamel paint from … |
| **rectangles** | `redirect` | stem(ctangle) | 1 | 10.24 | Mark Rothko produced enormous canvases of stacked soft-edged coloured rectangles that overwhelmed th… |
| **silk-screening** | `screen` | substring(screen) | 1 | 10.24 | Andy Warhol abandoned the entire premise of unique art by silk-screening Campbell soup cans, Marilyn… |
| **reproductions** | `produce` | stem(production) | 1 | 10.24 | Andy Warhol abandoned the entire premise of unique art by silk-screening Campbell soup cans, Marilyn… |
| **entrepreneurs** | `entrepreneurship` | stem(entrepreneur) | 1 | 10.25 | A handful of Jewish immigrant entrepreneurs migrated west from New York to the small Los Angeles sub… |
| **broadway** | `broad` | substring(broad) | 1 | 10.25 | The Broadway theatre district in midtown Manhattan generated musicals fusing song, dialogue, choreog… |
| **steel-skeleton** | `skeleton` | substring(skeleton) | 1 | 10.26 | After the Chicago Fire, engineers invented the steel-skeleton load-bearing structure, which permitte… |
| **fallingwater** | `water` | substring(water) | 1 | 10.26 | The American architect Frank Lloyd Wright moved in the opposite direction, designing the residence F… |
| **waterfall** | `water` | substring(water) | 1 | 10.26 | The American architect Frank Lloyd Wright moved in the opposite direction, designing the residence F… |
| **horizontal** | `horizon` | substring(horizon) | 1 | 10.26 | The American architect Frank Lloyd Wright moved in the opposite direction, designing the residence F… |
| **terraces** | `territory` | stem(terrace) | 1 | 10.26 | The American architect Frank Lloyd Wright moved in the opposite direction, designing the residence F… |
| **unpredictable** | `predictable` | stem(predict) | 1 | 10.26 | The Canadian-born architect Frank Gehry departed from straight lines entirely, designing the Guggenh… |
| **endowments** | `endowment` | stem(endowment) | 1 | 10.27 | Eight private universities along the northeastern American coast collectively form what is now known… |
| **founders** | `found` | stem(founder) | 1 | 10.27 | The Massachusetts Institute of Technology and Stanford University, the principal engineering schools… |
| **preference** | `infer` | stem(ference) | 1 | 10.27 | Affirmative action policies attempting to increase the representation of historically underrepresent… |
| **constitutionally** | `constitute` | stem(constitutional) | 1 | 10.27 | Affirmative action policies attempting to increase the representation of historically underrepresent… |
| **imprisonment** | `prison` | stem(prison) | 1 | 10.28 | American women acquired the legal right to vote only after a prolonged campaign of demonstrations, h… |
| **suffragettes** | `suffragette` | stem(suffragette) | 1 | 10.28 | American women acquired the legal right to vote only after a prolonged campaign of demonstrations, h… |
| **reproductive** | `productive` | stem(product) | 1 | 10.28 | The Supreme Court in Roe versus Wade subsequently established a constitutional right to abortion, wh… |
| **amendments** | `amendment` | stem(amendment) | 1 | 10.28 | Title Nine of the Education Amendments required federally funded American schools to provide equal o… |
| **contested** | `antagonize` | stem(contest) | 1 | 10.29 | Across the subsequent half-century the movement achieved the legalisation of same-sex marriage by th… |
| **igniting** | `ignite` | stem(ignit) | 1 | 10.29 | The Black Lives Matter movement emerged in response to the deaths of unarmed Black Americans in poli… |
| **protests** | `detest` | stem(protest) | 1 | 10.29 | The Black Lives Matter movement emerged in response to the deaths of unarmed Black Americans in poli… |
| **wildfires** | `bewildered` | stem(wildfire) | 1 | 10.30 | California wildfires consumed entire towns.… |
| **detects** | `detect` | stem(detect) | 1 | 10.31 | The functional magnetic resonance imaging scanner detects which neighbouring regions of the cortex r… |
| **neurons** | `neuroscience` | stem(neuron) | 1 | 10.31 | The functional magnetic resonance imaging scanner detects which neighbouring regions of the cortex r… |
| **synapses** | `neuron` | stem(synapse) | 1 | 10.31 | The functional magnetic resonance imaging scanner detects which neighbouring regions of the cortex r… |
| **permits** | `omit` | stem(permit) | 1 | 10.31 | The functional magnetic resonance imaging scanner detects which neighbouring regions of the cortex r… |
| **hypothesise** | `hypothesis` | stem(hypothes) | 1 | 10.31 | The functional magnetic resonance imaging scanner detects which neighbouring regions of the cortex r… |
| **lights** | `elucidate` | stem(light) | 1 | 10.31 | The amygdala lights up during fear, generating an anxious arousal that is hard to negate consciously… |
| **consciously** | `subconscious` | stem(consci) | 1 | 10.31 | The amygdala lights up during fear, generating an anxious arousal that is hard to negate consciously… |
| **predominantly** | `dominant` | stem(dominant) | 1 | 10.31 | The neuroscientists also identified the lateralisation of language, predominantly housed in the left… |
| **detected** | `detect` | stem(detect) | 1 | 10.31 | The reward neurotransmitter dopamine, generated whenever a peer-approved goal is achieved or a posit… |
| **registers** | `register` | stem(gister) | 1 | 10.31 | The body's homeostasis is maintained by a thousand small feedback loops that the conscious mind neve… |
| **mandates** | `demand` | stem(mandate) | 1 | 10.32 | The Miranda warning, articulated after a Supreme Court ruling on a wrongful confession in Arizona, n… |
| **accommodates** | `accommodate` | stem(accommodate) | 1 | 10.32 | The jury system, inherited from English common law, accommodates twelve ordinary citizens within the… |
| **precedents** | `prudent` | stem(cedent) | 1 | 10.32 | When that verdict is challenged on appeal, the rebuttal must articulate either new evidence or new p… |
| **orders** | `coordinate` | stem(order) | 1 | 10.32 | Even the federal quarantine orders that closed every airport during the recent pandemic ultimately r… |
| **civil-defence** | `civil` | substring(civil) | 1 | 10.32 | Even the federal quarantine orders that closed every airport during the recent pandemic ultimately r… |
| **credential** | `credible` | stem-of-family | 1 | 10.33 | Across the post-war decades the American Master of Business Administration evolved into the standard… |
| **off-balance-sheet** | `balance` | substring(balance) | 1 | 10.33 | The Enron collapse, in which a publicly traded energy corporation had been concealing immense hazard… |
| **creates** | `concrete` | stem(create) | 1 | 10.33 | The Enron collapse, in which a publicly traded energy corporation had been concealing immense hazard… |
| **reassure** | `ensure` | stem(assure) | 1 | 10.33 | Every American shareholder now reads the annual statement for indications of solvency, transparency,… |
| **specifying** | `specification` | stem(specify) | 1 | 10.33 | The contemporary American corporation produces an annual statement specifying revenue, cost, invento… |
| **expenses** | `compensate` | stem(expense) | 1 | 10.33 | Internal travel and entertainment expenses are now reimbursed only against documented receipts.… |
| **receipts** | `deceitful` | stem(ceipt) | 1 | 10.33 | Internal travel and entertainment expenses are now reimbursed only against documented receipts.… |
| **operational** | `cooperate` | stem(operation) | 1 | 10.33 | Apple, under the operational genius of Tim Cook, eventually constructed the most profitable industri… |
| **contracts** | `abstract` | stem(contract) | 1 | 10.33 | Apple, under the operational genius of Tim Cook, eventually constructed the most profitable industri… |
| **suppliers** | `supply` | stem(supplier) | 1 | 10.33 | Apple, under the operational genius of Tim Cook, eventually constructed the most profitable industri… |
| **presidential** | `residential` | stem(sidenti) | 1 | 10.34 | The pollster George Gallup demonstrated this in the nineteen thirties by predicting the American pre… |
| **deployed** | `exploit` | stem(deploy) | 1 | 10.34 | The standard statistical instruments of contemporary research, including the median, the mode, the v… |
| **applying** | `implied` | stem(apply) | 1 | 10.34 | The matrix of numerical parameters underlying every machine-learning model is similarly recursive, w… |
| **subscribers** | `scribe` | substring(scribe) | 1 | 10.34 | Netflix, having accumulated the viewing histories of several hundred million subscribers into a sing… |
| **recommends** | `commendable` | stem(commend) | 1 | 10.34 | Netflix, having accumulated the viewing histories of several hundred million subscribers into a sing… |
| **variables** | `enable` | stem(variable) | 1 | 10.34 | Netflix, having accumulated the viewing histories of several hundred million subscribers into a sing… |
| **cross-validation** | `valid` | substring(valid) | 1 | 10.34 | Any salient correlation that turns out to be equivocal on closer inspection is now flagged automatic… |
| **assumptions** | `assumption` | stem(assumption) | 1 | 10.35 | American urban planners across the twenty-first century have begun to revisit the assumptions on whi… |
| **districts** | `restrict` | stem(trict) | 1 | 10.35 | Barcelona's neighbouring superblock districts implemented the same principle across several neighbou… |
| **tables** | `establish` | stem(table) | 1 | 10.35 | Barcelona's neighbouring superblock districts implemented the same principle across several neighbou… |
| **informal** | `formidable` | strip-in | 1 | 10.35 | Singapore's national housing programme made urban sanitation, public transit, and affordable apartme… |
| **surmounting** | `surmount` | stem(surmount) | 1 | 10.35 | Singapore's national housing programme made urban sanitation, public transit, and affordable apartme… |
| **challenges** | `challenging` | stem(challenge) | 1 | 10.35 | Singapore's national housing programme made urban sanitation, public transit, and affordable apartme… |
| **standards** | `withstand` | stem(standard) | 1 | 10.35 | Transparency, accountability, and dense local participation have become the conspicuous standards of… |
| **urbanism** | `urban` | substring(urban) | 1 | 10.35 | Transparency, accountability, and dense local participation have become the conspicuous standards of… |
| **replaces** | `replace` | stem(place) | 1 | 10.36 | The sponge city concept, developed by Dutch engineers and exported to dozens of municipalities, repl… |
| **impermeable** | `enable` | stem(perme) | 1 | 10.36 | The sponge city concept, developed by Dutch engineers and exported to dozens of municipalities, repl… |
| **increases** | `incremental` | stem(crease) | 1 | 10.36 | The sponge city concept, developed by Dutch engineers and exported to dozens of municipalities, repl… |
| **basins** | `basin` | stem(basin) | 1 | 10.36 | The sponge city concept, developed by Dutch engineers and exported to dozens of municipalities, repl… |
| **restores** | `restore` | stem(store) | 1 | 10.36 | The sponge city concept, developed by Dutch engineers and exported to dozens of municipalities, repl… |
| **once-burgeoning** | `burgeon` | substring(burgeon) | 1 | 10.36 | Where the concept has been implemented at scale, the eutrophication that follows excess agricultural… |
| **basements** | `basic` | stem(basement) | 1 | 10.36 | At the opposite end of the spectrum, vertical farms in Manhattan basements grow lettuce hydroponical… |
| **hydroponically** | `hydroponics` | stem(hydropon) | 1 | 10.36 | At the opposite end of the spectrum, vertical farms in Manhattan basements grow lettuce hydroponical… |
| **light-emitting** | `light` | substring(light) | 1 | 10.36 | At the opposite end of the spectrum, vertical farms in Manhattan basements grow lettuce hydroponical… |
| **indoor** | `dormant` | strip-in | 1 | 10.36 | The agronomy of indoor vertical farming, an unlikely application of classical botany, will not displ… |
| **discharged** | `charged` | stem(charg) | 1 | 10.36 | Industrial effluent discharged into rivers is intercepted earlier in the treatment process, and the … |
| **intercepted** | `exceptional` | stem(tercept) | 1 | 10.36 | Industrial effluent discharged into rivers is intercepted earlier in the treatment process, and the … |
| **derivatives** | `derive` | stem(derivative) | 1 | 10.37 | The chemist Wallace Carothers at the DuPont laboratory in Wilmington discovered, through patient cat… |
| **long-chain** | `chain` | substring(chain) | 1 | 10.37 | The chemist Wallace Carothers at the DuPont laboratory in Wilmington discovered, through patient cat… |
| **stockings** | `stock` | substring(stock) | 1 | 10.37 | The polymer he had generated, named nylon, replaced silk in parachutes during the Second World War, … |
| **trivial-seeming** | `trivial` | substring(trivial) | 1 | 10.37 | Even the trivial-seeming dilemma of how to attach a sticky note without leaving residue eventually g… |
| **determines** | `terminate` | stem(determine) | 1 | 10.37 | Engineers test every new alloy for tensile strength, fatigue resistance, corrosion behaviour, and th… |
| **prototypes** | `prototype` | stem(prototype) | 1 | 10.37 | The wind turbine, the jet engine, the surgical implant, and the rocket nozzle all rest on the same a… |
| **stricter** | `restrict` | stem(strict) | 1 | 10.37 | The wind turbine, the jet engine, the surgical implant, and the rocket nozzle all rest on the same a… |
