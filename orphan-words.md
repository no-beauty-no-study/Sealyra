# Orphan content words from Stage 0 readings

Each row is a 6+ character word that appears in a chapter article
but the linkify lookup (direct head + family/kin reverse + prefix
strip + stem fallback) can't reach any parchment card.

For each word, ask GPT to produce:

  1. Which **existing** PARCHMENT_CARDS head to anchor it to (look
     for a head sharing a root, prefix, or semantic family).
  2. One **family-style** line (if the orphan is an inflection /
     direct derivative of that head) **or** a **kin-style** line
     (if it just shares a root).  Same format used by existing
     cards:

         "<word> | <pos> | <english collocation> | <chinese gloss>"

  3. If nothing in PARCHMENT_CARDS is a credible anchor, mark
     "NEW CARD" and propose a full card stub.

Process in **chapter order** — Chapter 1 first, since that's the
user's current reading.

Total orphans: **849**


## Chapter 1 (102 orphans)

| Word | Hits | Sections | Sentence excerpt |
|---|---:|---|---|
| kilometres | 15 | 1.4, 2.2, 2.6 | That negligible gap sounds like a curiosity until you recall the navigation satellites in orbit overhead: thei… |
| civilisation | 12 | 1.5, 1.7, 2.5 | The sunlight that warms your face is older than human civilisation itself.… |
| reached | 12 | 1.6, 2.2, 2.3 | Days commenced and concluded inside only a handful of hours, because the planet rotated on its axis at a veloc… |
| centre | 10 | 1.2, 6.4, 9.13 | If a spacecraft were to plunge inward while a distant observer watched its descent from a safe orbit, that obs… |
| engineers | 10 | 1.4, 9.4, 9.14 | That negligible gap sounds like a curiosity until you recall the navigation satellites in orbit overhead: thei… |
| working | 10 | 1.6, 9.13, 9.20 | A rogue planet about the size of Mars, which astronomers working backwards from the wreckage have designated T… |
| nuclear | 8 | 1.2, 2.6, 9.49 | When a giant star has at last consumed the nuclear fuel that had sustained it for billions of years, gravity w… |
| required | 8 | 1.3, 9.2, 9.8 | Eventually they designated this invisible mass as dark matter, mostly because the scientific consensus require… |
| existence | 8 | 1.6, 5.4, 8.23 | Earth, in its first hours of existence, very nearly endured a catastrophe from which it might never have recov… |
| matter | 7 | 1.1, 1.3, 2.3 | Only after aeons of gradual cooling, as the primordial matter slowly dissipated its inconceivable heat, could … |
| patterns | 7 | 1.3, 3.3, 3.12 | The constellations we see at night are merely the patterns nearby stars happen to make against the deeper back… |
| controlled | 7 | 1.5, 3.11, 8.12 | On a quiet day the collision merely illuminates the polar sky with shimmering aurorae; on a violent day the sa… |
| previously | 6 | 1.2, 2.4, 2.7 | When a giant star has at last consumed the nuclear fuel that had sustained it for billions of years, gravity w… |
| boundary | 6 | 1.2, 6.5, 8.1 | Around that point hangs an invisible boundary called the event horizon, and once anything has crossed it, noth… |
| scientific | 6 | 1.3, 4.8, 5.3 | Eventually they designated this invisible mass as dark matter, mostly because the scientific consensus require… |
| station | 6 | 1.4, 4.7, 7.7 | An astronaut who occupies a space station orbiting above the atmosphere returns a few thousandths of a second … |
| propagate | 5 | 1.1, 1.5, 6.6 | Only after aeons of gradual cooling, as the primordial matter slowly dissipated its inconceivable heat, could … |
| physics | 5 | 1.2, 9.25, 9.41 | The exhausted core buckles inward, and condenses everything it once contained into a single point of unimagina… |
| distant | 5 | 1.2, 1.7, 2.1 | If a spacecraft were to plunge inward while a distant observer watched its descent from a safe orbit, that obs… |
| bodies | 5 | 1.3, 3.6, 8.3 | It constitutes one undistinguished ember among the hundred billion celestial bodies that inhabit the Milky Way… |
| frozen | 5 | 1.3, 2.2, 4.1 | The constellations we see at night are merely the patterns nearby stars happen to make against the deeper back… |
| astronomers | 5 | 1.3, 1.6, 7.6 | When astronomers first began to measure the orbital velocity of stars near the edge of a galaxy, they encounte… |
| intact | 5 | 1.3, 3.7, 3.10 | Yet the galaxies endured, coherent and intact.… |
| moving | 5 | 1.4, 3.3, 6.6 | Nothing in nature can exceed it, and the closer anything accelerates toward that ceiling, the more time itself… |
| sunlight | 5 | 1.5, 2.1, 2.2 | The sunlight that warms your face is older than human civilisation itself.… |
| colossal | 5 | 1.6, 2.4, 3.7 | When the new Moon was young it occupied a position so close to Earth that it almost filled half the sky, and i… |
| handful | 5 | 1.6, 1.7, 8.8 | Days commenced and concluded inside only a handful of hours, because the planet rotated on its axis at a veloc… |
| civilisations | 5 | 1.7, 3.7, 6.1 | The universe has endured for so long, and encompasses so many stars and so many planets, that the galaxy ought… |
| begins | 4 | 1.2, 1.4, 3.8 | Stranger still, time itself begins to slow as the gravity intensifies.… |
| glowing | 4 | 1.3, 1.6, 2.6 | The constellations we see at night are merely the patterns nearby stars happen to make against the deeper back… |
| instrument | 4 | 1.3, 6.3, 8.12 | Something invisible was holding the stars in their orbits, something no instrument astronomers have ever devis… |
| ceiling | 4 | 1.4, 7.9, 9.14 | Nothing in nature can exceed it, and the closer anything accelerates toward that ceiling, the more time itself… |
| whatever | 4 | 1.4, 3.2, 4.4 | Nothing in nature can exceed it, and the closer anything accelerates toward that ceiling, the more time itself… |
| clocks | 4 | 1.4, 9.47 | The astronaut aboard would step out of her capsule having endured only a little ageing, while the planet she l… |
| neighbour | 4 | 1.5, 8.17 | But the plasma packing the Sun's core is so dense that the new photon cannot propagate straight outward; inste… |
| filled | 4 | 1.6, 5.1, 7.9 | When the new Moon was young it occupied a position so close to Earth that it almost filled half the sky, and i… |
| lethal | 4 | 1.6, 7.10, 8.15 | The magnetic field that deflects the lethal radiation streaming off the Sun is no fixed buttress: every few hu… |
| neighbours | 4 | 1.7, 3.3, 3.9 | The universe has endured for so long, and encompasses so many stars and so many planets, that the galaxy ought… |
| nobody | 4 | 1.7, 2.1, 3.14 | The candidate answers nobody likes go like this.… |
| intuition | 3 | 1.1, 8.9, 9.19 | From this incomprehensible compression, the universe erupted outward with such violence that it underwent a ph… |
| particles | 3 | 1.1, 1.5, 4.10 | Only after aeons of gradual cooling, as the primordial matter slowly dissipated its inconceivable heat, could … |
| witness | 3 | 1.1, 3.6, 5.9 | Only after aeons of gradual cooling, as the primordial matter slowly dissipated its inconceivable heat, could … |
| stretched | 3 | 1.1, 1.2, 9.44 | That ancient radiance, now stretched and attenuated by the relentless expansion of space, still permeates the … |
| relentless | 3 | 1.1, 2.4, 9.3 | That ancient radiance, now stretched and attenuated by the relentless expansion of space, still permeates the … |
| layers | 3 | 1.2, 9.34, 10.37 | When a giant star has at last consumed the nuclear fuel that had sustained it for billions of years, gravity w… |
| spacecraft | 3 | 1.2, 1.4 | If a spacecraft were to plunge inward while a distant observer watched its descent from a safe orbit, that obs… |
| appear | 3 | 1.2, 2.2, 10.1 | If a spacecraft were to plunge inward while a distant observer watched its descent from a safe orbit, that obs… |
| remainder | 3 | 1.2, 9.19, 9.25 | If a spacecraft were to plunge inward while a distant observer watched its descent from a safe orbit, that obs… |
| stream | 3 | 1.2, 4.1, 6.4 | If a spacecraft were to plunge inward while a distant observer watched its descent from a safe orbit, that obs… |
| occasional | 3 | 1.2, 1.3, 3.4 | One looms at the heart of almost every galaxy we have ever observed, our own Milky Way included, where it pers… |
| telescope | 3 | 1.3, 1.7, 9.19 | It constitutes one undistinguished ember among the hundred billion celestial bodies that inhabit the Milky Way… |
| deeper | 3 | 1.3, 4.11, 9.51 | The constellations we see at night are merely the patterns nearby stars happen to make against the deeper back… |
| managed | 3 | 1.3, 2.4, 5.1 | Something invisible was holding the stars in their orbits, something no instrument astronomers have ever devis… |
| nature | 3 | 1.4, 9.3, 9.21 | Nothing in nature can exceed it, and the closer anything accelerates toward that ceiling, the more time itself… |
| closer | 3 | 1.4, 2.4, 10.34 | Nothing in nature can exceed it, and the closer anything accelerates toward that ceiling, the more time itself… |
| occupies | 3 | 1.4, 7.6, 10.37 | An astronaut who occupies a space station orbiting above the atmosphere returns a few thousandths of a second … |
| curiosity | 3 | 1.4, 5.2, 7.11 | That negligible gap sounds like a curiosity until you recall the navigation satellites in orbit overhead: thei… |
| crushed | 3 | 1.5, 4.7, 9.45 | Far down inside the Sun, where the temperature ascends into the millions and hydrogen atoms are crushed togeth… |
| vacuum | 3 | 1.5, 9.31, 10.37 | Once that photon finally breaks free of the surface and enters the vacuum of space, the trip across to Earth t… |
| yellow | 3 | 1.5, 7.4, 9.47 | On a quiet day the collision merely illuminates the polar sky with shimmering aurorae; on a violent day the sa… |
| strength | 3 | 1.5, 4.10, 10.37 | On a quiet day the collision merely illuminates the polar sky with shimmering aurorae; on a violent day the sa… |
| receded | 3 | 1.6, 9.1, 10.36 | Then, over hundreds of millions of years, the Moon receded outward and the rotation slowed, until that same Mo… |
| modest | 3 | 1.6, 2.5, 2.7 | Then, over hundreds of millions of years, the Moon receded outward and the rotation slowed, until that same Mo… |
| interval | 3 | 1.7, 4.6, 9.25 | A handful among them constitute rough Earth-analogues, occupying just the right interval from their parent sta… |
| deliberately | 3 | 1.7, 3.10, 10.31 | Perhaps the older civilisations out there deliberately obscure themselves from beginners like us.… |
| answer | 3 | 1.7, 3.4, 9.17 | Or, most unsettling of all, perhaps we genuinely constitute the very first to emerge in the cosmos, the only o… |
| unimaginable | 2 | 1.1, 1.2 | In an epoch so remote that no human concept of time can encompass it, the entirety of the cosmos was condensed… |
| familiar | 2 | 1.1, 1.2 | In an epoch so remote that no human concept of time can encompass it, the entirety of the cosmos was condensed… |
| bearing | 2 | 1.1, 5.3 | Only after aeons of gradual cooling, as the primordial matter slowly dissipated its inconceivable heat, could … |
| permeates | 2 | 1.1, 9.36 | That ancient radiance, now stretched and attenuated by the relentless expansion of space, still permeates the … |
| stations | 2 | 1.1, 8.21 | That ancient radiance, now stretched and attenuated by the relentless expansion of space, still permeates the … |
| losing | 2 | 1.2, 4.6 | When a giant star has at last consumed the nuclear fuel that had sustained it for billions of years, gravity w… |
| stranger | 2 | 1.2, 1.3 | Stranger still, time itself begins to slow as the gravity intensifies.… |
| plunge | 2 | 1.2, 7.5 | If a spacecraft were to plunge inward while a distant observer watched its descent from a safe orbit, that obs… |
| watched | 2 | 1.2, 10.18 | If a spacecraft were to plunge inward while a distant observer watched its descent from a safe orbit, that obs… |
| included | 2 | 1.2, 2.2 | One looms at the heart of almost every galaxy we have ever observed, our own Milky Way included, where it pers… |
| rotating | 2 | 1.3, 4.3 | It constitutes one undistinguished ember among the hundred billion celestial bodies that inhabit the Milky Way… |
| centres | 2 | 1.3, 10.10 | It constitutes one undistinguished ember among the hundred billion celestial bodies that inhabit the Milky Way… |
| stretch | 2 | 1.3, 6.2 | The constellations we see at night are merely the patterns nearby stars happen to make against the deeper back… |
| puzzle | 2 | 1.3, 9.17 | When astronomers first began to measure the orbital velocity of stars near the edge of a galaxy, they encounte… |
| holding | 2 | 1.3, 8.4 | Something invisible was holding the stars in their orbits, something no instrument astronomers have ever devis… |
| picture | 2 | 1.3, 10.13 | And then the picture grew stranger.… |
| propelled | 2 | 1.3, 2.5 | The cosmos as a whole, the data revealed, is not merely expanding but accelerating outward, propelled apart by… |
| aboard | 2 | 1.4, 7.2 | The astronaut aboard would step out of her capsule having endured only a little ageing, while the planet she l… |
| ageing | 2 | 1.4, 9.22 | The astronaut aboard would step out of her capsule having endured only a little ageing, while the planet she l… |
| returns | 2 | 1.4, 10.33 | An astronaut who occupies a space station orbiting above the atmosphere returns a few thousandths of a second … |
| younger | 2 | 1.4, 8.8 | An astronaut who occupies a space station orbiting above the atmosphere returns a few thousandths of a second … |
| faster | 2 | 1.4, 6.1 | An astronaut who occupies a space station orbiting above the atmosphere returns a few thousandths of a second … |
| farther | 2 | 1.4, 6.5 | An astronaut who occupies a space station orbiting above the atmosphere returns a few thousandths of a second … |
| journey | 2 | 1.5, 4.6 | But the plasma packing the Sun's core is so dense that the new photon cannot propagate straight outward; inste… |
| average | 2 | 1.5, 5.9 | But the plasma packing the Sun's core is so dense that the new photon cannot propagate straight outward; inste… |
| nearest | 2 | 1.5, 3.4 | But our nearest star is not a gentle neighbour.… |
| backwards | 2 | 1.6, 2.2 | A rogue planet about the size of Mars, which astronomers working backwards from the wreckage have designated T… |
| wreckage | 2 | 1.6, 9.51 | A rogue planet about the size of Mars, which astronomers working backwards from the wreckage have designated T… |
| height | 2 | 1.6, 10.3 | When the new Moon was young it occupied a position so close to Earth that it almost filled half the sky, and i… |
| streaming | 2 | 1.6, 4.10 | The magnetic field that deflects the lethal radiation streaming off the Sun is no fixed buttress: every few hu… |
| outright | 2 | 1.6, 2.1 | The magnetic field that deflects the lethal radiation streaming off the Sun is no fixed buttress: every few hu… |
| catalogued | 2 | 1.7, 9.10 | We have by now catalogued thousands of planets in orbit around distant stars, found by telescopes of ever-grea… |
| telescopes | 2 | 1.7, 7.6 | We have by now catalogued thousands of planets in orbit around distant stars, found by telescopes of ever-grea… |
| listening | 2 | 1.7, 9.28 | Meanwhile, immense radio dishes scan the sky continuously, listening for any signal that another civilisation … |
| physicist | 2 | 1.7, 10.20 | The physicist Enrico Fermi articulated the paradox in five plain words: where is everybody?… |
| calling | 2 | 1.7, 3.9 | Or, most unsettling of all, perhaps we genuinely constitute the very first to emerge in the cosmos, the only o… |

## Chapter 2 (103 orphans)

| Word | Hits | Sections | Sentence excerpt |
|---|---:|---|---|
| surrounding | 18 | 2.1, 5.1, 5.9 | Deep below those oceans, hydrothermal vents emerged along the volcanic seams in the crust, expelling scalding … |
| arrived | 17 | 2.5, 4.6, 5.3 | That is how each modern continent eventually arrived at such a divergent collection of native animals: not by … |
| living | 12 | 2.3, 3.1, 3.3 | For more than two billion years after life first appeared, every living thing remained in the water.… |
| recorded | 10 | 2.1, 3.10, 5.7 | Once the surface had finally hardened, the dense clouds above released a downpour that endured, by some estima… |
| evolved | 10 | 2.5, 3.1, 5.1 | One particular line of reptiles, modest in size at the outset, evolved across the next thirty million years in… |
| opposite | 10 | 2.5, 6.4, 7.3 | That is how each modern continent eventually arrived at such a divergent collection of native animals: not by … |
| narrow | 8 | 2.2, 3.7, 5.4 | Life persisted, but only in narrow pockets near hydrothermal vents on the seafloor, where heat continued to es… |
| walked | 8 | 2.3, 3.2, 3.3 | Every tetrapod that has ever walked, jumped, flown, or burrowed, from the heaviest elephant down to the smalle… |
| received | 7 | 2.2, 2.4, 8.15 | Crucially, the volcanoes themselves never paused: across millions of years they kept generating carbon dioxide… |
| marine | 7 | 2.4, 6.2, 7.1 | The eroding topography of the supercontinent exposed bare strata of sediment to relentless acid rain, while in… |
| collapsed | 7 | 2.6, 5.6, 7.8 | The entire complex food chain, maintained throughout the long Mesozoic, collapsed inside what geologists call … |
| absence | 6 | 2.1, 5.2, 5.8 | The released oxygen accumulated relentlessly in the seawater and then in the atmosphere, and here arrives the … |
| refined | 6 | 2.3, 7.12, 9.8 | Its descendants, with the kind of patience only evolution can demonstrate, traded gills for lungs, refined the… |
| landmass | 6 | 2.4, 3.1, 4.1 | Two hundred and fifty million years ago every landmass on Earth converged into a single colossal supercontinen… |
| chemistry | 6 | 2.4, 8.19, 9.9 | The eroding topography of the supercontinent exposed bare strata of sediment to relentless acid rain, while in… |
| surviving | 6 | 2.4, 2.7, 4.3 | The few species that managed to withstand the disaster received a stage that had been almost completely cleare… |
| dinosaurs | 6 | 2.5, 2.6, 4.1 | These were the dinosaurs, and they encompassed every conceivable ecological niche so quickly that no rival ver… |
| fragment | 6 | 2.5, 2.6, 3.1 | Pangaea had begun to fragment.… |
| including | 6 | 2.6, 6.4, 7.9 | Roughly three quarters of every species on the planet was eradicated, including every dinosaur larger than a c… |
| released | 5 | 2.1, 4.8, 5.8 | Once the surface had finally hardened, the dense clouds above released a downpour that endured, by some estima… |
| learned | 5 | 2.1, 3.1, 4.4 | Then a particular cyanobacterium learned to harness sunlight directly, and the by-product of its new metabolis… |
| descendants | 5 | 2.3, 3.3, 3.8 | Its descendants, with the kind of patience only evolution can demonstrate, traded gills for lungs, refined the… |
| insect | 5 | 2.3, 4.5, 5.8 | Imagine swatting at an insect and discovering it is the size of an eagle.… |
| opened | 5 | 2.4, 3.2, 9.20 | Across what is now Siberia, fissures opened in the crust and persisted for almost a million years, expelling l… |
| survivors | 5 | 2.5, 7.11, 9.12 | Onto the empty stage stepped the survivors, and they refused to apologise for being alive.… |
| ecological | 5 | 2.5, 5.2, 5.4 | These were the dinosaurs, and they encompassed every conceivable ecological niche so quickly that no rival ver… |
| afterward | 4 | 2.1, 8.10, 9.25 | For roughly two billion years afterward, life persisted as a microbial film, consuming dissolved carbon and ex… |
| seawater | 4 | 2.1, 2.4, 8.6 | The released oxygen accumulated relentlessly in the seawater and then in the atmosphere, and here arrives the … |
| plants | 4 | 2.3, 2.5, 2.6 | Plants ascended onto the shore first, slowly, awkwardly, like reluctant tourists at a hostile resort, but thei… |
| afternoon | 4 | 2.3, 2.5, 3.10 | That was an ordinary afternoon in the Carboniferous swamp.… |
| stepped | 4 | 2.5, 3.7, 9.31 | Onto the empty stage stepped the survivors, and they refused to apologise for being alive.… |
| launched | 4 | 2.5, 9.50, 10.16 | That is how each modern continent eventually arrived at such a divergent collection of native animals: not by … |
| collided | 4 | 2.6, 8.1, 9.1 | Sixty-six million years ago a stone roughly ten kilometres across, an unannounced fragment of debris orbiting … |
| inheritance | 4 | 2.6, 3.8, 8.11 | Above them, where the dinosaurs had ruled for one hundred and sixty-five million years, the surface stood almo… |
| branch | 4 | 2.7, 3.3, 3.4 | One particularly modest branch of these mammals ascended into the canopies of tropical forests and constituted… |
| saturated | 3 | 2.1, 8.22, 10.25 | Deep below those oceans, hydrothermal vents emerged along the volcanic seams in the crust, expelling scalding … |
| chemical | 3 | 2.1, 9.4, 10.37 | Deep below those oceans, hydrothermal vents emerged along the volcanic seams in the crust, expelling scalding … |
| microbial | 3 | 2.1, 9.40 | For roughly two billion years afterward, life persisted as a microbial film, consuming dissolved carbon and ex… |
| dissolved | 3 | 2.1, 2.4, 9.35 | For roughly two billion years afterward, life persisted as a microbial film, consuming dissolved carbon and ex… |
| cooled | 3 | 2.2, 2.7, 4.11 | For reasons climatologists still argue about, the atmosphere cooled so drastically that ice advanced from the … |
| utterly | 3 | 2.2, 3.4, 8.11 | Animals of forms so bizarre they appear nearly imaginary suddenly emerged in the fossil record: the predatory … |
| anatomical | 3 | 2.2, 9.14, 9.23 | Yet hidden along Pikaia's slender body lay a thin internal rod called a notochord, and that single anatomical … |
| patience | 3 | 2.2, 2.3, 3.11 | Yet hidden along Pikaia's slender body lay a thin internal rod called a notochord, and that single anatomical … |
| granted | 3 | 2.3, 2.7, 10.28 | Plants ascended onto the shore first, slowly, awkwardly, like reluctant tourists at a hostile resort, but thei… |
| traded | 3 | 2.3, 8.23, 10.33 | Its descendants, with the kind of patience only evolution can demonstrate, traded gills for lungs, refined the… |
| reptiles | 3 | 2.3, 2.5 | Its descendants, with the kind of patience only evolution can demonstrate, traded gills for lungs, refined the… |
| suffering | 3 | 2.4, 8.11 | The oceans absorbed so much carbon dioxide that they turned acidic and the dissolved oxygen they had once cont… |
| chapter | 3 | 2.4, 9.46, 10.31 | The few species that managed to withstand the disaster received a stage that had been almost completely cleare… |
| prevailed | 3 | 2.5, 8.8 | For one hundred and sixty-five million years, a duration roughly four hundred times longer than human civilisa… |
| directions | 3 | 2.5, 5.5, 10.26 | That is how each modern continent eventually arrived at such a divergent collection of native animals: not by … |
| downward | 3 | 2.6, 6.4, 10.7 | Sixty-six million years ago a stone roughly ten kilometres across, an unannounced fragment of debris orbiting … |
| incinerated | 3 | 2.6, 9.49, 10.17 | The impact ejected a curtain of incinerated rock into the upper atmosphere, where it ascended into orbital tra… |
| eroded | 3 | 2.6, 5.6, 10.30 | Tsunamis dispersed outward from the impact site, vast walls of water that eroded coastlines on every shore of … |
| coastlines | 3 | 2.6, 6.3, 10.30 | Tsunamis dispersed outward from the impact site, vast walls of water that eroded coastlines on every shore of … |
| starved | 3 | 2.6, 9.45 | The herbivores starved.… |
| underground | 3 | 2.6, 7.10 | But a few small mammals had been quietly inhabiting underground burrows, hibernating through the worst of the … |
| belonged | 3 | 2.7, 8.20, 9.43 | Once the giants were gone, the planet belonged to the mammals.… |
| survival | 3 | 2.7, 8.17, 10.8 | Across the next sixty million years they accumulated the survival features we now take entirely for granted: d… |
| offspring | 3 | 2.7, 5.2, 8.22 | Across the next sixty million years they accumulated the survival features we now take entirely for granted: d… |
| stones | 3 | 2.7, 7.8, 8.20 | The freed pair of forelimbs accumulated stones, manipulated sticks, kindled the first fires, and ignited the l… |
| turbulent | 2 | 2.1, 9.39 | Beneath a roiling atmosphere of steam and corrosive gases, the crust constituted a turbulent ocean of magma th… |
| expelling | 2 | 2.1, 2.4 | Deep below those oceans, hydrothermal vents emerged along the volcanic seams in the crust, expelling scalding … |
| thrived | 2 | 2.1, 2.4 | The released oxygen accumulated relentlessly in the seawater and then in the atmosphere, and here arrives the … |
| pockets | 2 | 2.2, 10.21 | Life persisted, but only in narrow pockets near hydrothermal vents on the seafloor, where heat continued to es… |
| escape | 2 | 2.2, 8.2 | Life persisted, but only in narrow pockets near hydrothermal vents on the seafloor, where heat continued to es… |
| volcanoes | 2 | 2.2, 7.1 | Crucially, the volcanoes themselves never paused: across millions of years they kept generating carbon dioxide… |
| paused | 2 | 2.2, 7.2 | Crucially, the volcanoes themselves never paused: across millions of years they kept generating carbon dioxide… |
| locked | 2 | 2.2, 3.9 | Crucially, the volcanoes themselves never paused: across millions of years they kept generating carbon dioxide… |
| opportunity | 2 | 2.2, 10.28 | Crucially, the volcanoes themselves never paused: across millions of years they kept generating carbon dioxide… |
| reptile | 2 | 2.2, 9.33 | Yet hidden along Pikaia's slender body lay a thin internal rod called a notochord, and that single anatomical … |
| strange | 2 | 2.2, 9.15 | Here is the strange consolation of being human: trace your own lineage backwards far enough and you arrive at … |
| survive | 2 | 2.3, 9.32 | The land above was a barren expanse, baked by ultraviolet radiation and devoid of the organic matter that vert… |
| ambush | 2 | 2.3, 3.3 | Tiktaalik almost certainly utilised those primitive limbs to crawl through tidal mudflats and ambush prey from… |
| heaviest | 2 | 2.3, 3.3 | Every tetrapod that has ever walked, jumped, flown, or burrowed, from the heaviest elephant down to the smalle… |
| geologists | 2 | 2.4, 2.6 | Two hundred and fifty million years ago every landmass on Earth converged into a single colossal supercontinen… |
| surrounded | 2 | 2.4, 4.9 | Two hundred and fifty million years ago every landmass on Earth converged into a single colossal supercontinen… |
| coastline | 2 | 2.4, 4.10 | The coastline, suddenly compressed into one continuous loop, dwindled drastically, and the vast interior of Pa… |
| contaminated | 2 | 2.4, 9.39 | Sulphur dioxide contaminated the air.… |
| eroding | 2 | 2.4, 10.7 | The eroding topography of the supercontinent exposed bare strata of sediment to relentless acid rain, while in… |
| acidic | 2 | 2.4, 3.3 | The oceans absorbed so much carbon dioxide that they turned acidic and the dissolved oxygen they had once cont… |
| breathe | 2 | 2.4, 4.9 | The oceans absorbed so much carbon dioxide that they turned acidic and the dissolved oxygen they had once cont… |
| episode | 2 | 2.4, 8.6 | The result was the Permian extinction, the most ruinous episode of mass dying the planet has ever endured.… |
| vanishing | 2 | 2.4, 7.8 | Life as a whole came closer to vanishing entirely than at any other moment in its history.… |
| disaster | 2 | 2.4, 10.30 | The few species that managed to withstand the disaster received a stage that had been almost completely cleare… |
| improvised | 2 | 2.4, 9.17 | The few species that managed to withstand the disaster received a stage that had been almost completely cleare… |
| canopies | 2 | 2.5, 2.7 | Long-necked sauropods consumed the canopies of entire forests in a single afternoon.… |
| leathery | 2 | 2.5, 2.7 | Pterosaurs, technically not dinosaurs but their close kin, articulated immense leathery wings and patrolled th… |
| seizing | 2 | 2.5, 10.3 | Plesiosaurs occupied the seas, propelled by paddled limbs and capable of seizing fish at depths most other rep… |
| sixty-five | 2 | 2.5, 2.6 | For one hundred and sixty-five million years, a duration roughly four hundred times longer than human civilisa… |
| motion | 2 | 2.5, 10.13 | The supercontinent split, and split again, and the resulting plates drifted apart in slow motion, each one car… |
| carrying | 2 | 2.5, 8.6 | The supercontinent split, and split again, and the resulting plates drifted apart in slow motion, each one car… |
| instant | 2 | 2.6, 10.10 | The entire complex food chain, maintained throughout the long Mesozoic, collapsed inside what geologists call … |
| dinosaur | 2 | 2.6, 4.1 | Roughly three quarters of every species on the planet was eradicated, including every dinosaur larger than a c… |
| chicken | 2 | 2.6, 9.24 | Roughly three quarters of every species on the planet was eradicated, including every dinosaur larger than a c… |
| stored | 2 | 2.6, 4.3 | But a few small mammals had been quietly inhabiting underground burrows, hibernating through the worst of the … |
| competitors | 2 | 2.7, 10.34 | Across the next sixty million years they accumulated the survival features we now take entirely for granted: d… |
| tropical | 2 | 2.7, 4.1 | One particularly modest branch of these mammals ascended into the canopies of tropical forests and constituted… |
| branches | 2 | 2.7, 3.4 | Life among the branches demands precision: to leap from one bough to the next without missing, the brain must … |
| landing | 2 | 2.7, 10.18 | Life among the branches demands precision: to leap from one bough to the next without missing, the brain must … |
| upright | 2 | 2.7, 3.2 | Forests across Africa diminished, and one particular line of primates was compelled to descend to the open sav… |
| sticks | 2 | 2.7, 10.24 | The freed pair of forelimbs accumulated stones, manipulated sticks, kindled the first fires, and ignited the l… |
| refinement | 2 | 2.7, 3.3 | The freed pair of forelimbs accumulated stones, manipulated sticks, kindled the first fires, and ignited the l… |
| recognise | 2 | 2.7, 9.19 | And from a single dwindling population of African australopithecines, one species eventually emerged that coul… |

## Chapter 3 (137 orphans)

| Word | Hits | Sections | Sentence excerpt |
|---|---:|---|---|
| political | 19 | 3.4, 3.11, 8.8 | Chimpanzees, our nearest cousin by genetic measure, live in restless political troops in which an alpha male p… |
| twentieth | 14 | 3.10, 3.11, 3.13 | In what is now Namibia, the German colonial authority herded the Herero people into the Kalahari and poisoned … |
| region | 13 | 3.2, 3.5, 4.1 | In nineteen seventy-four, palaeoanthropologists excavating one such ash bed in the Afar region of Ethiopia ext… |
| landscape | 11 | 3.5, 4.1, 4.4 | As the vegetation deteriorated, the dust accumulated and the entire region transformed into the harshest lands… |
| remains | 11 | 3.11, 4.11, 9.4 | It remains one of the most improbable political transitions of the twentieth century.… |
| country | 11 | 3.14, 5.8, 8.20 | The country chose the unlikely path of digital governance: the entire territory was wired with fibre optic cab… |
| summer | 10 | 3.5, 3.7, 4.9 | Ten thousand years ago, the region we now call the Sahara was a sprawling network of lakes and grasslands fed … |
| network | 9 | 3.5, 7.7, 7.10 | Ten thousand years ago, the region we now call the Sahara was a sprawling network of lakes and grasslands fed … |
| returning | 9 | 3.6, 4.4, 6.6 | An African grey parrot named Alex mastered three hundred English words and articulated genuine questions about… |
| agricultural | 9 | 3.7, 6.1, 8.18 | This dependable cycle of inundation generated the agricultural surplus that sustained one of humanity's earlie… |
| organised | 9 | 3.9, 3.11, 4.7 | Several coastal African kingdoms quickly perceived that capturing neighbours and exchanging them with the fore… |
| movement | 9 | 3.11, 9.45, 9.47 | South Africa presented the starkest case: a ruling white minority enforced a legal system called apartheid tha… |
| rainforest | 8 | 3.4, 3.8, 3.13 | While one branch of African primates wandered out across the world, several other branches stayed in the equat… |
| northward | 8 | 3.5, 5.1, 8.1 | Ten thousand years ago, the region we now call the Sahara was a sprawling network of lakes and grasslands fed … |
| wooden | 8 | 3.8, 3.9, 4.7 | They had been concealed in private wooden chests by descendants who would rather hide their inheritance than s… |
| migrated | 8 | 3.13, 4.10, 9.7 | Almost simultaneously, the human immunodeficiency virus migrated out of the central African rainforest and pro… |
| geological | 7 | 3.1, 3.5, 5.1 | Eighty-eight million years of geological solitude generated a continent in miniature, populated by creatures t… |
| cities | 7 | 3.6, 6.4, 8.15 | Even the cities of the continent that no human ever designed prove cognitively impressive: army ants link them… |
| national | 7 | 3.14, 7.12, 9.17 | The country chose the unlikely path of digital governance: the entire territory was wired with fibre optic cab… |
| volume | 7 | 3.14, 7.3, 8.2 | In Nigeria, the Nollywood film industry currently produces more films per year than Hollywood, ranking as the … |
| traverses | 6 | 3.2, 3.7, 4.3 | A considerable fissure called the East African Rift opened in the crust and continues to expand to this day, s… |
| buried | 6 | 3.2, 4.1, 4.6 | As volcanic ash from each successive eruption settled across the rift, it buried whatever had been lying on th… |
| female | 6 | 3.2, 3.4, 4.3 | In nineteen seventy-four, palaeoanthropologists excavating one such ash bed in the Afar region of Ethiopia ext… |
| colour | 6 | 3.6, 5.5, 5.9 | An African grey parrot named Alex mastered three hundred English words and articulated genuine questions about… |
| coastal | 6 | 3.9, 4.5, 6.3 | Several coastal African kingdoms quickly perceived that capturing neighbours and exchanging them with the fore… |
| failed | 6 | 3.10, 5.8, 8.19 | King Leopold of Belgium designated the entire Congo basin as his private estate and compelled the inhabitants … |
| fields | 6 | 3.12, 5.8, 7.12 | The rhythmic patterns enslaved Africans carried into the holds of the slave ships eventually transformed, in t… |
| returned | 6 | 3.12, 4.6, 6.2 | The beat that left the continent in chains four centuries ago has returned in triumph, and Africa now defines … |
| coloured | 5 | 3.1, 7.4, 9.38 | With no large predator ever managing to colonise the island, the early primates left there were free to divers… |
| nineteen | 5 | 3.2, 3.11, 3.12 | In nineteen seventy-four, palaeoanthropologists excavating one such ash bed in the Afar region of Ethiopia ext… |
| communities | 5 | 3.3, 9.12, 9.17 | Human communities still living on the African savannah occupy the same food chain as their unspeaking neighbou… |
| mountain | 5 | 3.4, 6.5, 7.1 | Gorillas, the largest of the three and gentle vegetarians, live in quiet mountain harems guided by a single si… |
| traversed | 5 | 3.8, 6.2, 6.3 | Camel caravans, each comprising several thousand animals, traversed the desert in convoys, transporting bars o… |
| principal | 5 | 3.8, 4.9, 9.11 | Scholars from across the Islamic world accompanied the trade and accumulated in the city's three principal mos… |
| medicine | 5 | 3.8, 8.9, 9.9 | Scholars from across the Islamic world accompanied the trade and accumulated in the city's three principal mos… |
| vanished | 5 | 3.8, 4.1, 7.5 | When the first European traveller finally reached Timbuktu in the early nineteenth century he found the wells … |
| colonial | 5 | 3.10, 3.13, 5.3 | In what is now Namibia, the German colonial authority herded the Herero people into the Kalahari and poisoned … |
| systematically | 5 | 3.10, 9.10, 9.49 | In what is now Namibia, the German colonial authority herded the Herero people into the Kalahari and poisoned … |
| documented | 5 | 3.10, 5.6, 8.4 | In what is now Namibia, the German colonial authority herded the Herero people into the Kalahari and poisoned … |
| presented | 5 | 3.11, 7.9, 10.22 | South Africa presented the starkest case: a ruling white minority enforced a legal system called apartheid tha… |
| enslaved | 5 | 3.12, 6.5, 10.9 | The rhythmic patterns enslaved Africans carried into the holds of the slave ships eventually transformed, in t… |
| military | 5 | 3.12, 4.8, 7.9 | In nineteen seventies Nigeria, the saxophonist Fela Kuti fused traditional Yoruba percussion with American fun… |
| rhythm | 5 | 3.12, 10.12 | The Jamaican Bob Marley, having traced his own rhythm back to West Africa, declared the continent the spiritua… |
| populated | 4 | 3.1, 3.3, 9.15 | Eighty-eight million years of geological solitude generated a continent in miniature, populated by creatures t… |
| countries | 4 | 3.2, 3.11, 9.50 | A considerable fissure called the East African Rift opened in the crust and continues to expand to this day, s… |
| excavated | 4 | 3.5, 7.5, 8.3 | Beneath today's dunes, the bones of crocodiles and turtles are still being excavated from the dried beds of fo… |
| mastered | 4 | 3.6, 6.2, 6.5 | An African grey parrot named Alex mastered three hundred English words and articulated genuine questions about… |
| previous | 4 | 3.6, 9.48, 10.34 | An African grey parrot named Alex mastered three hundred English words and articulated genuine questions about… |
| channel | 4 | 3.7, 6.2, 7.3 | Egyptian scribes also pioneered an early cartography of the river, charting every channel and seasonal flood l… |
| nineteenth | 4 | 3.8, 3.9, 3.10 | When the first European traveller finally reached Timbuktu in the early nineteenth century he found the wells … |
| libraries | 4 | 3.8, 9.5, 9.10 | When the first European traveller finally reached Timbuktu in the early nineteenth century he found the wells … |
| return | 4 | 3.9, 4.3, 4.6 | Several coastal African kingdoms quickly perceived that capturing neighbours and exchanging them with the fore… |
| prisoners | 4 | 3.9, 5.7, 10.19 | Several coastal African kingdoms quickly perceived that capturing neighbours and exchanging them with the fore… |
| twelve | 4 | 3.9, 4.8, 8.5 | Across four centuries this transatlantic slave trade transported somewhere between ten and twelve million Afri… |
| foreign | 4 | 3.9, 5.1, 8.20 | The wound was not inflicted only by the foreign ships; it was inflicted, as every honest historian eventually … |
| colonies | 4 | 3.10, 5.7, 5.9 | At the end of the nineteenth century the European powers gathered around a single map in Berlin and drew the b… |
| borders | 4 | 3.10, 3.11, 9.53 | The borders the Europeans drew that afternoon still hold today, decades after independence, with all their eth… |
| middle | 4 | 3.11, 4.7, 7.3 | Across the middle of the twentieth century, almost every African colony achieved nominal independence, yet the… |
| lawyer | 4 | 3.11, 8.12, 10.9 | Nelson Mandela, a young lawyer and political organiser, was imprisoned in nineteen sixty-four for resisting th… |
| president | 4 | 3.11, 9.49, 10.16 | As president, he chose to forgive rather than retaliate, supervising a peaceful transition of power that produ… |
| declared | 4 | 3.12, 8.21, 9.20 | The Jamaican Bob Marley, having traced his own rhythm back to West Africa, declared the continent the spiritua… |
| spiritual | 4 | 3.12, 8.9, 9.15 | The Jamaican Bob Marley, having traced his own rhythm back to West Africa, declared the continent the spiritua… |
| person | 4 | 3.12, 8.17, 9.41 | The Jamaican Bob Marley, having traced his own rhythm back to West Africa, declared the continent the spiritua… |
| killing | 4 | 3.13, 10.17, 10.29 | Almost simultaneously, the human immunodeficiency virus migrated out of the central African rainforest and pro… |
| delivered | 4 | 3.14, 7.9, 9.4 | The country chose the unlikely path of digital governance: the entire territory was wired with fibre optic cab… |
| fifteen | 3 | 3.2, 4.5, 9.39 | Fifteen million years ago Africa itself began to tear apart.… |
| walking | 3 | 3.2, 8.12, 9.16 | She was an australopithecine, an early hominid whose anatomy demonstrated that bipedal walking had developed i… |
| pursuit | 3 | 3.3, 9.32, 10.4 | Lions, the heaviest cats on the planet, dominate the upper level of that food chain, hunting in coordinated pr… |
| problem | 3 | 3.4, 8.2 | Bonobos, who differ from chimpanzees only slightly in anatomy, have devised an utterly different solution to t… |
| former | 3 | 3.5, 9.49, 10.13 | Beneath today's dunes, the bones of crocodiles and turtles are still being excavated from the dried beds of fo… |
| researcher | 3 | 3.6, 8.6, 10.19 | An African grey parrot named Alex mastered three hundred English words and articulated genuine questions about… |
| metres | 3 | 3.6, 6.4, 7.1 | Even the cities of the continent that no human ever designed prove cognitively impressive: army ants link them… |
| northeastern | 3 | 3.7, 5.9, 10.27 | Once every summer, the great river that traverses northeastern Africa flooded reliably across its lower valley… |
| intended | 3 | 3.7, 9.18, 10.8 | The pharaoh, who functioned as both king and living god, mobilised entire generations of stonemasons to assemb… |
| trading | 3 | 3.8, 7.9, 9.12 | On the southern edge of the Sahara, where the desert begins to yield to the savannah, a trading city named Tim… |
| kingdoms | 3 | 3.8, 3.9 | Camel caravans, each comprising several thousand animals, traversed the desert in convoys, transporting bars o… |
| accompanied | 3 | 3.8, 8.22, 10.35 | Scholars from across the Islamic world accompanied the trade and accumulated in the city's three principal mos… |
| theology | 3 | 3.8, 9.11, 9.33 | Scholars from across the Islamic world accompanied the trade and accumulated in the city's three principal mos… |
| sugarcane | 3 | 3.9, 5.8, 6.5 | Across four centuries this transatlantic slave trade transported somewhere between ten and twelve million Afri… |
| divided | 3 | 3.11, 9.54, 10.19 | Across the middle of the twentieth century, almost every African colony achieved nominal independence, yet the… |
| carried | 3 | 3.12, 7.7, 8.15 | The rhythmic patterns enslaved Africans carried into the holds of the slave ships eventually transformed, in t… |
| propagated | 3 | 3.13, 8.14, 10.3 | Almost simultaneously, the human immunodeficiency virus migrated out of the central African rainforest and pro… |
| border | 3 | 3.14, 8.10, 9.54 | Across the border in Kenya, the mobile-money service called M-Pesa allows farmers without bank accounts to tra… |
| farmers | 3 | 3.14, 8.7 | Across the border in Kenya, the mobile-money service called M-Pesa allows farmers without bank accounts to tra… |
| ranking | 3 | 3.14, 10.22, 10.34 | In Nigeria, the Nollywood film industry currently produces more films per year than Hollywood, ranking as the … |
| settled | 2 | 3.1, 3.2 | A fragment of what is now Africa broke loose from the parent continent eighty-eight million years ago and drif… |
| brightly | 2 | 3.1, 7.4 | With no large predator ever managing to colonise the island, the early primates left there were free to divers… |
| sticky | 2 | 3.1, 10.37 | The chameleon learned to rotate each eye independently and to unfurl a sticky tongue twice the length of its b… |
| moisture | 2 | 3.1, 7.6 | The baobab simply enlarged its trunk into a living water tank capable of accumulating enough moisture to endur… |
| anatomy | 2 | 3.2, 3.4 | She was an australopithecine, an early hominid whose anatomy demonstrated that bipedal walking had developed i… |
| grassland | 2 | 3.3, 10.5 | One particular branch chose to remain on the same African grassland where Lucy had walked, and that branch per… |
| stomachs | 2 | 3.3, 4.3 | Vultures circle above the entire system, scavengers whose acidic stomachs can devour rotting carcasses that wo… |
| rotting | 2 | 3.3, 8.4 | Vultures circle above the entire system, scavengers whose acidic stomachs can devour rotting carcasses that wo… |
| related | 2 | 3.4, 9.42 | Three closely related apes now share that vast green canopy.… |
| carefully | 2 | 3.4, 3.5 | Chimpanzees, our nearest cousin by genetic measure, live in restless political troops in which an alpha male p… |
| dispute | 2 | 3.4, 9.25 | Bonobos, who differ from chimpanzees only slightly in anatomy, have devised an utterly different solution to t… |
| sexual | 2 | 3.4, 10.28 | Bonobos, who differ from chimpanzees only slightly in anatomy, have devised an utterly different solution to t… |
| grasslands | 2 | 3.5, 10.4 | Ten thousand years ago, the region we now call the Sahara was a sprawling network of lakes and grasslands fed … |
| cliffs | 2 | 3.5, 9.33 | Ten thousand years ago, the region we now call the Sahara was a sprawling network of lakes and grasslands fed … |
| cattle | 2 | 3.5, 7.12 | Ten thousand years ago, the region we now call the Sahara was a sprawling network of lakes and grasslands fed … |
| degree | 2 | 3.5, 3.6 | Then, roughly three thousand years ago, the orbital tilt of the Earth altered by a fraction of a degree, the m… |
| textbooks | 2 | 3.6, 9.23 | The fauna south of the Sahara turn out to be considerably more cognitively sophisticated than the older textbo… |
| reward | 2 | 3.6, 10.31 | Chimpanzees in laboratory tasks throw food back at experimenters when they observe another chimp receive a swe… |
| evening | 2 | 3.6, 9.52 | Even the cities of the continent that no human ever designed prove cognitively impressive: army ants link them… |
| flooded | 2 | 3.7, 10.36 | Once every summer, the great river that traverses northeastern Africa flooded reliably across its lower valley… |
| centralised | 2 | 3.7, 8.10 | This dependable cycle of inundation generated the agricultural surplus that sustained one of humanity's earlie… |
| corpse | 2 | 3.7, 8.11 | An elaborate guide to the underworld, the Book of the Dead, was deposited with each corpse to instruct the sou… |
| astronomy | 2 | 3.8, 10.2 | Scholars from across the Islamic world accompanied the trade and accumulated in the city's three principal mos… |
| traveller | 2 | 3.8, 8.15 | When the first European traveller finally reached Timbuktu in the early nineteenth century he found the wells … |
| concealed | 2 | 3.8, 7.8 | They had been concealed in private wooden chests by descendants who would rather hide their inheritance than s… |
| invasion | 2 | 3.8, 9.36 | Most of those chests have outlasted every subsequent invasion.… |
| captured | 2 | 3.9, 7.9 | European ships began calling regularly at the West African coast from the late fifteenth century, exchanging g… |
| capturing | 2 | 3.9, 9.38 | Several coastal African kingdoms quickly perceived that capturing neighbours and exchanging them with the fore… |
| transatlantic | 2 | 3.9, 6.4 | Across four centuries this transatlantic slave trade transported somewhere between ten and twelve million Afri… |
| somewhere | 2 | 3.9, 3.13 | Across four centuries this transatlantic slave trade transported somewhere between ten and twelve million Afri… |
| slavery | 2 | 3.9, 10.11 | The demographic and social fabric of West Africa fractured under the constant haemorrhage of its young populat… |
| absorbing | 2 | 3.9, 10.30 | The whole continent is still absorbing the aftershock.… |
| decided | 2 | 3.9, 10.34 | The wound was not inflicted only by the foreign ships; it was inflicted, as every honest historian eventually … |
| rulers | 2 | 3.10, 8.8 | At the end of the nineteenth century the European powers gathered around a single map in Berlin and drew the b… |
| ruling | 2 | 3.11, 10.32 | South Africa presented the starkest case: a ruling white minority enforced a legal system called apartheid tha… |
| twenty-seven | 2 | 3.11, 10.24 | Nelson Mandela, a young lawyer and political organiser, was imprisoned in nineteen sixty-four for resisting th… |
| consecutive | 2 | 3.11, 4.3 | Nelson Mandela, a young lawyer and political organiser, was imprisoned in nineteen sixty-four for resisting th… |
| transition | 2 | 3.11, 8.23 | As president, he chose to forgive rather than retaliate, supervising a peaceful transition of power that produ… |
| hip-hop | 2 | 3.12, 10.12 | The rhythmic patterns enslaved Africans carried into the holds of the slave ships eventually transformed, in t… |
| traditional | 2 | 3.12, 9.13 | In nineteen seventies Nigeria, the saxophonist Fela Kuti fused traditional Yoruba percussion with American fun… |
| traced | 2 | 3.12, 9.46 | The Jamaican Bob Marley, having traced his own rhythm back to West Africa, declared the continent the spiritua… |
| descendant | 2 | 3.12, 8.9 | Today Afrobeats, the modern descendant of Fela's original synthesis, has overtaken pop charts in London, Paris… |
| overtaken | 2 | 3.12, 10.18 | Today Afrobeats, the modern descendant of Fela's original synthesis, has overtaken pop charts in London, Paris… |
| classified | 2 | 3.13, 5.7 | In Rwanda, the colonial Belgian administration had classified the population into two groups, Hutu and Tutsi, … |
| originated | 2 | 3.13, 9.40 | Malaria continues to terminate the life of a child somewhere on the continent every two minutes, and Ebola eru… |
| mobile | 2 | 3.14, 8.22 | The country chose the unlikely path of digital governance: the entire territory was wired with fibre optic cab… |
| service | 2 | 3.14, 8.8 | Across the border in Kenya, the mobile-money service called M-Pesa allows farmers without bank accounts to tra… |
| allows | 2 | 3.14, 5.2 | Across the border in Kenya, the mobile-money service called M-Pesa allows farmers without bank accounts to tra… |
| instantly | 2 | 3.14, 10.17 | Across the border in Kenya, the mobile-money service called M-Pesa allows farmers without bank accounts to tra… |
| studied | 2 | 3.14, 10.4 | Across the border in Kenya, the mobile-money service called M-Pesa allows farmers without bank accounts to tra… |
| textbook | 2 | 3.14, 9.10 | And in Malawi, a fourteen-year-old boy named William Kamkwamba built a fully functional windmill from a borrow… |
| married | 2 | 3.14, 9.36 | And in Malawi, a fourteen-year-old boy named William Kamkwamba built a fully functional windmill from a borrow… |

## Chapter 4 (61 orphans)

| Word | Hits | Sections | Sentence excerpt |
|---|---:|---|---|
| research | 10 | 4.8, 8.4, 9.35 | Twelve nations signed a treaty designating the entire Antarctic continent as a scientific reserve, prohibiting… |
| individual | 9 | 4.3, 8.12, 9.35 | Hundreds of males huddle together in a continuously rotating mass that distributes the cold equally and preven… |
| traverse | 9 | 4.7, 5.1, 5.2 | The British explorer Shackleton once attempted to traverse the entire Antarctic continent on foot.… |
| technique | 8 | 4.4, 8.14, 9.15 | Each predator has devised a specialised technique tuned exactly to its single available prey, and the result i… |
| upward | 7 | 4.2, 4.4, 6.2 | As the cold water circulates, it pumps deep nutrients upward toward the surface, and the sunlight reaching the… |
| attempted | 7 | 4.7, 5.8, 7.12 | The British explorer Shackleton once attempted to traverse the entire Antarctic continent on foot.… |
| opening | 7 | 4.11, 8.20, 9.13 | The thaw is opening the long-frozen Northwest Passage to commercial shipping, and Russia, Canada, Denmark, and… |
| nations | 6 | 4.8, 5.9, 10.3 | Twelve nations signed a treaty designating the entire Antarctic continent as a scientific reserve, prohibiting… |
| months | 5 | 4.3, 5.2, 9.18 | The male incubates the egg on his feet beneath a brood pouch of warm skin for four consecutive months, standin… |
| insisted | 5 | 4.6, 8.8, 9.16 | The British captain Scott, by contrast, insisted on dragging ponies and motor sledges across terrain that demo… |
| annual | 5 | 4.9, 6.1, 10.33 | The Arctic tern, the bird with the longest annual migration on Earth, traverses to the Antarctic and back ever… |
| lifetime | 5 | 4.9, 9.3, 9.17 | The Arctic tern, the bird with the longest annual migration on Earth, traverses to the Antarctic and back ever… |
| alongside | 5 | 4.10, 9.14, 9.36 | Further east, in Lapland, the Sami people migrated alongside reindeer herds across the seasons, treating the e… |
| resident | 4 | 4.3, 8.2, 9.29 | The Antarctic ice imposes a peculiar parental rule on its most famous resident.… |
| degrees | 4 | 4.3, 4.5, 4.10 | The male incubates the egg on his feet beneath a brood pouch of warm skin for four consecutive months, standin… |
| prevents | 4 | 4.3, 4.5, 7.6 | Hundreds of males huddle together in a continuously rotating mass that distributes the cold equally and preven… |
| infancy | 4 | 4.6, 8.6, 8.22 | The Norwegian explorer Amundsen prepared meticulously: sled dogs trained from infancy, a route surveyed in adv… |
| captain | 4 | 4.6, 5.7, 7.9 | The British captain Scott, by contrast, insisted on dragging ponies and motor sledges across terrain that demo… |
| contrast | 4 | 4.6, 4.9, 7.4 | The British captain Scott, by contrast, insisted on dragging ponies and motor sledges across terrain that demo… |
| stretches | 4 | 4.7, 5.4, 5.9 | When the floe finally fragmented into pieces too small to inhabit, Shackleton led six men in a small lifeboat … |
| environmental | 4 | 4.8, 10.23, 10.36 | The discovery provoked the most successful environmental agreement ever signed, which eliminated those chemica… |
| peoples | 4 | 4.10, 5.5, 7.12 | Across the long polar nights, the sky above both peoples could suddenly ignite with the green and violet curta… |
| circumpolar | 3 | 4.1, 4.2 | Then the continent drifted slowly southward to its present position above the pole, and a vast new ocean curre… |
| reaching | 3 | 4.2, 6.2, 8.19 | As the cold water circulates, it pumps deep nutrients upward toward the surface, and the sunlight reaching the… |
| fishing | 3 | 4.4, 8.21, 10.37 | Leopard seals lurk just beneath the surface near a crack in the ice and wait silently for penguins returning f… |
| explosive | 3 | 4.4, 4.9, 10.10 | Leopard seals lurk just beneath the surface near a crack in the ice and wait silently for penguins returning f… |
| specialised | 3 | 4.4, 5.2, 8.2 | Each predator has devised a specialised technique tuned exactly to its single available prey, and the result i… |
| perished | 3 | 4.6, 7.10, 9.5 | On the return journey Scott and his four companions perished one by one inside their tent during a blizzard, e… |
| caught | 3 | 4.7, 9.24, 9.26 | His ship Endurance was caught in pack ice before it ever reached the coast, and the ice gradually crushed the … |
| signed | 3 | 4.8, 10.11 | Twelve nations signed a treaty designating the entire Antarctic continent as a scientific reserve, prohibiting… |
| permitting | 3 | 4.8, 8.2, 10.9 | The discovery provoked the most successful environmental agreement ever signed, which eliminated those chemica… |
| strikes | 3 | 4.9, 10.15, 10.28 | The bear waits motionlessly at a breathing hole in the ice until a seal surfaces, then strikes with a single e… |
| stacked | 3 | 4.10, 9.43, 10.24 | The Inuit of the Arctic constructed shelters from compacted snow bricks cut and stacked into a domed structure… |
| reindeer | 3 | 4.10, 8.23, 9.52 | Further east, in Lapland, the Sami people migrated alongside reindeer herds across the seasons, treating the e… |
| treating | 3 | 4.10, 9.9, 10.19 | Further east, in Lapland, the Sami people migrated alongside reindeer herds across the seasons, treating the e… |
| southward | 2 | 4.1, 9.1 | Then the continent drifted slowly southward to its present position above the pole, and a vast new ocean curre… |
| warmer | 2 | 4.1, 4.5 | Within a few hundred thousand years the entire landmass was encompassed by a kilometre-thick ice sheet, and ev… |
| patches | 2 | 4.2, 4.5 | Krill swarm in shoals so dense that they tint entire patches of the Southern Ocean red, and from that single s… |
| concentrated | 2 | 4.2, 9.22 | Without the patient upwelling of nutrients that the circumpolar current induces, none of this concentrated abu… |
| famous | 2 | 4.3, 6.4 | The Antarctic ice imposes a peculiar parental rule on its most famous resident.… |
| chicks | 2 | 4.3, 10.23 | When the chicks finally hatch, the females return from the sea with their stomachs full of fish, and exhausted… |
| females | 2 | 4.3, 8.4 | When the chicks finally hatch, the females return from the sea with their stomachs full of fish, and exhausted… |
| simple | 2 | 4.4, 10.34 | A simple food chain forces every predator on it to develop more elaborate strategies.… |
| leopard | 2 | 4.4, 8.2 | Leopard seals lurk just beneath the surface near a crack in the ice and wait silently for penguins returning f… |
| played | 2 | 4.4, 9.29 | Each predator has devised a specialised technique tuned exactly to its single available prey, and the result i… |
| explorer | 2 | 4.6, 4.7 | The Norwegian explorer Amundsen prepared meticulously: sled dogs trained from infancy, a route surveyed in adv… |
| member | 2 | 4.6, 6.6 | He reached the pole, planted his country's flag, and returned without losing a single member of his party.… |
| eleven | 2 | 4.6, 10.18 | On the return journey Scott and his four companions perished one by one inside their tent during a blizzard, e… |
| preparation | 2 | 4.6, 9.40 | Preparation, the Antarctic concluded, is not optional in this climate.… |
| sleeping | 2 | 4.7, 8.2 | For more than two years the party persisted on that ice, sleeping in salvaged tents, consuming first their shi… |
| fragmented | 2 | 4.7, 9.50 | When the floe finally fragmented into pieces too small to inhabit, Shackleton led six men in a small lifeboat … |
| testing | 2 | 4.8, 10.37 | Twelve nations signed a treaty designating the entire Antarctic continent as a scientific reserve, prohibiting… |
| allowing | 2 | 4.8, 9.15 | Decades later, scientists drilling deep cores into the ice extracted bubbles of air that had been preserved wi… |
| thinning | 2 | 4.8, 10.23 | The same scientists discovered, through routine monitoring, that the ozone layer above the continent was thinn… |
| discovery | 2 | 4.8, 5.7 | The discovery provoked the most successful environmental agreement ever signed, which eliminated those chemica… |
| distance | 2 | 4.9, 7.7 | The Arctic tern, the bird with the longest annual migration on Earth, traverses to the Antarctic and back ever… |
| violet | 2 | 4.10, 9.52 | Across the long polar nights, the sky above both peoples could suddenly ignite with the green and violet curta… |
| collide | 2 | 4.10, 6.4 | Across the long polar nights, the sky above both peoples could suddenly ignite with the green and violet curta… |
| measurably | 2 | 4.11, 10.36 | The pack ice of the Arctic now shrinks measurably every summer, and polar bears who cannot find a stable floe … |
| shipping | 2 | 4.11, 9.52 | The thaw is opening the long-frozen Northwest Passage to commercial shipping, and Russia, Canada, Denmark, and… |
| decomposing | 2 | 4.11, 10.36 | The frozen soil of Siberia and Alaska contains the slowly decomposing remains of ancient vegetation, and as th… |

## Chapter 5 (38 orphans)

| Word | Hits | Sections | Sentence excerpt |
|---|---:|---|---|
| writing | 7 | 5.4, 7.7, 9.3 | They developed no system of writing in the European sense, yet they devised something equally durable.… |
| disease | 7 | 5.8, 9.40, 10.8 | Within decades the rabbit population, in the absence of any natural predator or local disease, exploded across… |
| increasingly | 6 | 5.9, 10.11, 10.27 | Meanwhile across the open Pacific, increasingly violent cyclones now strike the low-lying nations of Tuvalu an… |
| leaves | 5 | 5.2, 7.4, 8.4 | Koalas ascended into the eucalyptus canopy and developed an entire metabolism specialised to digest its toxic … |
| carries | 5 | 5.3, 5.5, 8.2 | The platypus is a mammal that lays eggs rather than bearing live young, swims with webbed feet, possesses a bi… |
| encoded | 5 | 5.4, 7.7, 9.55 | The entire terrain of the continent, every water source, every dangerous animal, every safe ridge, was encoded… |
| instruments | 5 | 5.5, 9.15, 9.21 | They steered outrigger canoes from one island to the next across distances that European sailors, even centuri… |
| follows | 4 | 5.2, 6.1, 9.47 | Every native Australian mammal you can name follows this pattern.… |
| pattern | 4 | 5.2, 6.1, 6.2 | Every native Australian mammal you can name follows this pattern.… |
| attempt | 4 | 5.5, 8.5, 9.16 | They steered outrigger canoes from one island to the next across distances that European sailors, even centuri… |
| natural | 4 | 5.8, 9.33, 9.47 | Within decades the rabbit population, in the absence of any natural predator or local disease, exploded across… |
| authorities | 4 | 5.8, 7.10, 8.22 | Decades later, the same authorities introduced cane toads from Hawaii to control insect pests in the sugarcane… |
| distances | 3 | 5.2, 5.5, 10.13 | Kangaroos perfected the bouncing gait that allows them to traverse vast distances at low energy cost, the legs… |
| openly | 3 | 5.3, 8.3, 10.22 | The first preserved specimen sent back to London by a colonial naturalist was widely assumed to be a hoax, wit… |
| sailors | 3 | 5.5, 6.6, 10.3 | They steered outrigger canoes from one island to the next across distances that European sailors, even centuri… |
| offshore | 3 | 5.6, 7.3, 7.6 | Without canoes, they lost the ability to fish offshore or to migrate elsewhere when famine arrived.… |
| enclosed | 3 | 5.6, 6.4, 9.1 | The chiefdoms that had once cooperated on the moai now began to wage war against each other, and the entire ci… |
| environment | 3 | 5.6, 6.6, 7.6 | Easter Island therefore constitutes the cleanest documented sample of an ecological suicide: a society that co… |
| recognised | 3 | 5.7, 8.8, 9.55 | Captain Cook charted the eastern coast of Australia, and the British Empire immediately recognised the value o… |
| encircled | 2 | 5.1, 8.19 | Australia tore loose from the supercontinent Gondwana very early in its geological history and drifted slowly … |
| competition | 2 | 5.1, 9.51 | Within the long isolation that followed, every native lineage on the continent evolved without competition fro… |
| unrelated | 2 | 5.2, 5.3 | Marsupial moles burrowed through the dry interior soil exactly as their unrelated placental counterparts excav… |
| elsewhere | 2 | 5.2, 5.6 | Marsupial moles burrowed through the dry interior soil exactly as their unrelated placental counterparts excav… |
| perfected | 2 | 5.2, 9.9 | Kangaroos perfected the bouncing gait that allows them to traverse vast distances at low energy cost, the legs… |
| biologists | 2 | 5.3, 8.3 | The first preserved specimen sent back to London by a colonial naturalist was widely assumed to be a hoax, wit… |
| accept | 2 | 5.3, 9.33 | Only when subsequent live specimens arrived did the scientific establishment accept that the creature was real… |
| encyclopaedia | 2 | 5.4, 9.8 | A single song constitutes a complete navigational chart and ecological encyclopaedia simultaneously.… |
| tracked | 2 | 5.5, 10.19 | They tracked the flight directions of seabirds to locate land below the horizon.… |
| steered | 2 | 5.5, 9.20 | They steered outrigger canoes from one island to the next across distances that European sailors, even centuri… |
| settlers | 2 | 5.6, 5.7 | On a particular remote Polynesian island, now called Easter Island, the original settlers gradually felled eve… |
| ceremonial | 2 | 5.6, 7.11 | On a particular remote Polynesian island, now called Easter Island, the original settlers gradually felled eve… |
| arriving | 2 | 5.7, 8.1 | Boatloads of prisoners began arriving in chains, and the colonies of New South Wales and Tasmania expanded acr… |
| settlements | 2 | 5.7, 10.10 | Boatloads of prisoners began arriving in chains, and the colonies of New South Wales and Tasmania expanded acr… |
| exploded | 2 | 5.8, 8.14 | Within decades the rabbit population, in the absence of any natural predator or local disease, exploded across… |
| control | 2 | 5.8, 10.14 | Decades later, the same authorities introduced cane toads from Hawaii to control insect pests in the sugarcane… |
| embedded | 2 | 5.9, 8.15 | It is constructed by the slow secretion of calcium carbonate by colonies of coral polyps cooperating with phot… |
| tissues | 2 | 5.9, 10.23 | It is constructed by the slow secretion of calcium carbonate by colonies of coral polyps cooperating with phot… |
| long-term | 2 | 5.9, 10.31 | When the surrounding sea temperature ascends only a few degrees above the long-term average, the corals expel … |

## Chapter 6 (23 orphans)

| Word | Hits | Sections | Sentence excerpt |
|---|---:|---|---|
| sailed | 4 | 6.2, 7.2, 9.33 | They sailed south to India in summer on the inward wind, exchanged spices and gemstones, and returned home on … |
| passing | 4 | 6.4, 8.1, 8.15 | Drifting downward from the Arctic in the opposite direction come the icebergs, immense fragments of glacial ic… |
| routes | 3 | 6.2, 7.9, 8.23 | Chinese fleets under the admiral Zheng He traversed the same routes in colossal wooden vessels, reaching the e… |
| strait | 3 | 6.2, 8.17 | Between the Indian Ocean and the Pacific lies the Malacca Strait, a narrow channel through which roughly a qua… |
| passes | 3 | 6.2, 7.7, 8.2 | Between the Indian Ocean and the Pacific lies the Malacca Strait, a narrow channel through which roughly a qua… |
| controls | 3 | 6.2, 9.54 | Whichever power controls the strait controls the route, and the channel has constituted a strategic chokehold … |
| lifted | 3 | 6.3, 8.2, 10.17 | A long rupture in the seabed off the western coast of Sumatra abruptly lifted the entire floor of the ocean, d… |
| higher | 3 | 6.3, 9.3, 9.35 | Yet immediately before the first wave arrived, elephants, birds, and dogs had already begun to flee inland to … |
| underwater | 3 | 6.3, 6.5, 6.6 | The catastrophe provoked the deployment of underwater pressure sensors across every major seabed, which now mo… |
| pressure | 3 | 6.3, 8.1, 9.30 | The catastrophe provoked the deployment of underwater pressure sensors across every major seabed, which now mo… |
| icebergs | 3 | 6.4, 7.5, 10.7 | Drifting downward from the Arctic in the opposite direction come the icebergs, immense fragments of glacial ic… |
| struck | 3 | 6.4, 7.4, 9.16 | Drifting downward from the Arctic in the opposite direction come the icebergs, immense fragments of glacial ic… |
| hauled | 3 | 6.5, 7.11, 9.6 | Once European ships had mastered the Atlantic wind systems, they used this ocean to construct one of the cruel… |
| shipped | 3 | 6.5, 7.10 | Once European ships had mastered the Atlantic wind systems, they used this ocean to construct one of the cruel… |
| navigate | 3 | 6.6, 9.55, 10.21 | Dolphins navigate by emitting rapid clicks and interpreting the returning echoes, mapping their underwater env… |
| prolonged | 2 | 6.1, 10.28 | The air above the land ascends in vast convection columns, and the moisture-saturated air from the Indian Ocea… |
| exchanged | 2 | 6.2, 7.10 | They sailed south to India in summer on the inward wind, exchanged spices and gemstones, and returned home on … |
| maritime | 2 | 6.2, 9.20 | Between the Indian Ocean and the Pacific lies the Malacca Strait, a narrow channel through which roughly a qua… |
| circular | 2 | 6.4, 9.13 | In the centre of the Atlantic lies the Sargasso Sea, a circular region of nearly stationary water enclosed by … |
| floating | 2 | 6.4, 10.3 | In the centre of the Atlantic lies the Sargasso Sea, a circular region of nearly stationary water enclosed by … |
| emitting | 2 | 6.6, 8.4 | Dolphins navigate by emitting rapid clicks and interpreting the returning echoes, mapping their underwater env… |
| singing | 2 | 6.6, 9.9 | Humpback whales produce songs that propagate hundreds of kilometres through the ocean, with every member of a … |
| strong | 2 | 6.6, 9.55 | Albatrosses, the largest seabirds on the planet, exploit the strong winds of the Southern Ocean to circle the … |

## Chapter 7 (51 orphans)

| Word | Hits | Sections | Sentence excerpt |
|---|---:|---|---|
| language | 13 | 7.12, 8.6, 9.9 | Football has become the third major South American export to the world after the potato and the chocolate bar:… |
| capital | 12 | 7.7, 7.9, 8.10 | A single instruction issued from the capital could descend across snow ridges and arrive at the coast before a… |
| forced | 10 | 7.10, 8.1, 8.2 | Spanish authorities forced indigenous Quechua and African slave labourers into the oxygen-thin tunnels to extr… |
| westward | 8 | 7.11, 8.9, 8.14 | The potato proved so productive that the population of northern Europe expanded rapidly until a single fungal … |
| church | 7 | 7.8, 9.9, 9.12 | The walls have nevertheless persisted intact through centuries of earthquakes that destroyed every Spanish chu… |
| layered | 6 | 7.3, 8.13, 9.15 | The Amazon delivers a volume of fresh water sufficient to push the saltwater of the ocean back a hundred kilom… |
| mountains | 6 | 7.5, 8.9, 8.13 | Glaciers descend from the pristine surrounding mountains and crawl slowly toward the Atlantic, where their lea… |
| hunters | 5 | 7.4, 7.5, 9.7 | Indigenous hunters extract the venom by simply wiping a blowdart tip across the frog's skin.… |
| completed | 5 | 7.9, 8.16, 9.8 | The conquest of the largest empire in the western hemisphere had been completed by a contagion riding ahead of… |
| multiple | 4 | 7.2, 8.14, 10.1 | Darwin realised that a single ancestral species had diversified gradually into multiple distinct forms by adap… |
| artillery | 4 | 7.5, 9.31, 9.53 | Glaciers descend from the pristine surrounding mountains and crawl slowly toward the Atlantic, where their lea… |
| nevertheless | 4 | 7.8, 9.19, 9.27 | The walls have nevertheless persisted intact through centuries of earthquakes that destroyed every Spanish chu… |
| pizarro | 4 | 7.9 | A small Spanish band led by the captain Pizarro approached the Inca empire with horses, swords, and firearms, … |
| horses | 4 | 7.9, 8.15, 9.7 | A small Spanish band led by the captain Pizarro approached the Inca empire with horses, swords, and firearms, … |
| thrust | 3 | 7.1, 9.8 | The thrust of that subduction has been so persistent that fossilised marine shells are still being discovered … |
| fossilised | 3 | 7.1, 7.5, 9.33 | The thrust of that subduction has been so persistent that fossilised marine shells are still being discovered … |
| knowing | 3 | 7.2, 9.12, 9.32 | Knowing how thoroughly his society would resist the implication that humans had emerged from the same mechanis… |
| permanent | 3 | 7.5, 9.35, 10.6 | The southernmost extremity of South America is Patagonia, a vast wind-scoured wasteland in which the constant … |
| leading | 3 | 7.5, 8.23, 9.37 | Glaciers descend from the pristine surrounding mountains and crawl slowly toward the Atlantic, where their lea… |
| applied | 3 | 7.8, 9.2, 10.32 | The masons cut every block of granite with such precision that the resulting walls accommodate no gap wide eno… |
| accepted | 3 | 7.9, 9.9 | Pizarro accepted the ransom and then, in a final deceitful gesture, executed Atahualpa anyway.… |
| victory | 3 | 7.9, 9.42, 10.16 | The conquest of the largest empire in the western hemisphere had been completed by a contagion riding ahead of… |
| peasant | 3 | 7.11, 9.12, 9.51 | The Andes had cultivated the potato for thousands of years before the Spanish encountered it, and the Spanish … |
| infected | 3 | 7.11, 9.12, 10.3 | The potato proved so productive that the population of northern Europe expanded rapidly until a single fungal … |
| currency | 3 | 7.11, 9.49, 9.54 | The cocoa bean had been ceremonial currency among the Aztec elite, valuable enough that a sack of beans could … |
| exported | 3 | 7.11, 8.17, 10.36 | The Spanish added sugar to the bitter Aztec drink, sweetened the resulting beverage, exported it to Europe, an… |
| exporting | 3 | 7.12, 9.45, 9.52 | The Amazon rainforest, often called the lungs of the planet, is being cleared rapidly at the present moment to… |
| lifting | 2 | 7.1, 8.20 | Across millions of years the Pacific plate has slowly subducted beneath the South American continent, lifting … |
| summit | 2 | 7.1, 7.3 | The thrust of that subduction has been so persistent that fossilised marine shells are still being discovered … |
| outcrops | 2 | 7.2, 10.26 | The young naturalist Charles Darwin sailed aboard a British vessel called the Beagle that paused at the Galápa… |
| realised | 2 | 7.2, 9.28 | Darwin realised that a single ancestral species had diversified gradually into multiple distinct forms by adap… |
| thoroughly | 2 | 7.2, 7.4 | Knowing how thoroughly his society would resist the implication that humans had emerged from the same mechanis… |
| publish | 2 | 7.2, 9.33 | Knowing how thoroughly his society would resist the implication that humans had emerged from the same mechanis… |
| drawing | 2 | 7.3, 9.51 | The Amazon River begins as a small glacial trickle near the summit of the Andes and traverses the entire South… |
| streams | 2 | 7.3, 10.23 | The Amazon River begins as a small glacial trickle near the summit of the Andes and traverses the entire South… |
| freshwater | 2 | 7.3, 10.6 | The Amazon delivers a volume of fresh water sufficient to push the saltwater of the ocean back a hundred kilom… |
| disguised | 2 | 7.4, 10.9 | The Amazon rainforest is the most thoroughly disguised landscape on the planet.… |
| angles | 2 | 7.5, 9.47 | The southernmost extremity of South America is Patagonia, a vast wind-scoured wasteland in which the constant … |
| ice-age | 2 | 7.5, 10.1 | Darwin during his Beagle voyage excavated the fossilised bones of an extinct giant ground sloth in the soil of… |
| megafauna | 2 | 7.5, 10.1 | Darwin during his Beagle voyage excavated the fossilised bones of an extinct giant ground sloth in the soil of… |
| instruction | 2 | 7.7, 10.19 | A single instruction issued from the capital could descend across snow ridges and arrive at the coast before a… |
| issued | 2 | 7.7, 8.16 | A single instruction issued from the capital could descend across snow ridges and arrive at the coast before a… |
| masons | 2 | 7.8, 9.8 | The masons cut every block of granite with such precision that the resulting walls accommodate no gap wide eno… |
| destroyed | 2 | 7.8, 9.32 | The walls have nevertheless persisted intact through centuries of earthquakes that destroyed every Spanish chu… |
| jungle | 2 | 7.8, 10.2 | After the empire collapsed, the citadel was simply abandoned and overgrown by the surrounding jungle, vanishin… |
| stumbled | 2 | 7.8, 8.10 | After the empire collapsed, the citadel was simply abandoned and overgrown by the surrounding jungle, vanishin… |
| searching | 2 | 7.8, 9.50 | After the empire collapsed, the citadel was simply abandoned and overgrown by the surrounding jungle, vanishin… |
| riding | 2 | 7.9, 8.15 | The conquest of the largest empire in the western hemisphere had been completed by a contagion riding ahead of… |
| tunnels | 2 | 7.10, 10.10 | Spanish authorities forced indigenous Quechua and African slave labourers into the oxygen-thin tunnels to extr… |
| afford | 2 | 7.11, 10.14 | The Andes had cultivated the potato for thousands of years before the Spanish encountered it, and the Spanish … |
| export | 2 | 7.12, 10.25 | Football has become the third major South American export to the world after the potato and the chocolate bar:… |

## Chapter 8 (118 orphans)

| Word | Hits | Sections | Sentence excerpt |
|---|---:|---|---|
| permitted | 11 | 8.3, 8.16, 9.33 | The Siberian cold has preserved the past with such precision that the future may yet be permitted to borrow fr… |
| medieval | 9 | 8.15, 8.17, 9.8 | The same road also conveyed the most lethal of its passengers: the plague bacterium, riding in the gut of flea… |
| imperial | 8 | 8.7, 8.8, 8.9 | The Chinese imperial government guarded the silkworm secret for over a thousand years, executing anyone who at… |
| philosopher | 8 | 8.9, 9.21, 9.24 | His spiritual descendant Zhuangzi pursued the same intuition further, asking whether the philosopher had dream… |
| post-war | 8 | 8.17, 9.49, 9.50 | The post-war animator Hayao Miyazaki, the director Akira Kurosawa, and the novelist Haruki Murakami have toget… |
| attempting | 6 | 8.8, 9.11, 9.17 | In the fifth century before the common era, an unemployed clerk named Confucius walked from one Chinese kingdo… |
| reshaped | 6 | 8.13, 8.19, 9.16 | Across the same span China generated four inventions that eventually reshaped the entire planet: paper, which … |
| religious | 6 | 8.14, 9.7, 9.12 | Tang dynasty Buddhist monks first carved entire sutras onto wooden blocks and printed multiple copies of each … |
| survived | 6 | 8.23, 9.5, 9.10 | Their accumulated folklore, transmitted across centuries by oral recitation, preserved an entire anthropologic… |
| philosophy | 5 | 8.8, 9.24, 9.36 | Confucianism was promulgated as the official state philosophy, and across the next two millennia it shaped the… |
| student | 5 | 8.13, 9.3, 9.36 | The Tang dynasty capital of Chang'an was the largest international city in the world during its century, its a… |
| entered | 5 | 8.20, 8.23, 9.5 | After a century of foreign humiliation, civil war, and revolutionary upheaval, China entered a period of auste… |
| dispatched | 5 | 8.21, 9.11, 9.31 | The Made in China 2025 strategy declared the intention to achieve self-sufficiency in artificial intelligence,… |
| programme | 5 | 8.22, 10.16, 10.18 | She matriculated through the formal Chinese educational apparatus, qualified for an art conservatoire as an ad… |
| written | 4 | 8.6, 8.8, 8.22 | Knowledge, the macaques had quietly demonstrated, does not require a written language.… |
| prince | 4 | 8.8, 8.11 | Not one prince listened.… |
| retreated | 4 | 8.8, 9.25, 10.6 | He retreated to teach a handful of students, dictated the conversations they later compiled as the Analects, a… |
| students | 4 | 8.8, 9.11, 10.27 | He retreated to teach a handful of students, dictated the conversations they later compiled as the Analects, a… |
| family | 4 | 8.8, 9.25, 9.29 | Confucianism was promulgated as the official state philosophy, and across the next two millennia it shaped the… |
| millennium | 4 | 8.8, 9.5, 9.23 | The system ran for thirteen hundred years, the first meritocratic civil service the planet had ever assembled,… |
| favour | 4 | 8.10, 9.22, 9.37 | He standardised the script, the coinage, the units of length and weight, and abolished hereditary aristocracy … |
| international | 4 | 8.13, 9.43, 9.51 | The Tang dynasty capital of Chang'an was the largest international city in the world during its century, its a… |
| mounted | 4 | 8.13, 9.11, 9.30 | Across the same span China generated four inventions that eventually reshaped the entire planet: paper, which … |
| printed | 4 | 8.14, 9.18, 9.19 | Tang dynasty Buddhist monks first carved entire sutras onto wooden blocks and printed multiple copies of each … |
| company | 4 | 8.18, 8.21, 9.21 | The British East India Company resolved the resulting deficit by industrialising opium cultivation in India an… |
| revolutionary | 4 | 8.20, 9.13, 9.31 | After a century of foreign humiliation, civil war, and revolutionary upheaval, China entered a period of auste… |
| period | 4 | 8.20, 9.8, 9.25 | After a century of foreign humiliation, civil war, and revolutionary upheaval, China entered a period of auste… |
| internet | 4 | 8.22, 10.21, 10.22 | Rather than enter institutional employment upon graduation, she leveraged the saturating new mobile internet i… |
| audience | 4 | 8.22, 9.28, 9.45 | Rather than enter institutional employment upon graduation, she leveraged the saturating new mobile internet i… |
| researchers | 4 | 8.23, 9.41, 10.22 | Their accumulated folklore, transmitted across centuries by oral recitation, preserved an entire anthropologic… |
| tracks | 3 | 8.5, 8.15, 10.25 | It simply tracks the wounded prey across the island for several days until the venom terminates the victim its… |
| secret | 3 | 8.7, 9.14, 10.17 | The Chinese imperial government guarded the silkworm secret for over a thousand years, executing anyone who at… |
| relationships | 3 | 8.8, 9.47, 10.22 | In the fifth century before the common era, an unemployed clerk named Confucius walked from one Chinese kingdo… |
| conversations | 3 | 8.8, 9.3 | He retreated to teach a handful of students, dictated the conversations they later compiled as the Analects, a… |
| citizen | 3 | 8.8, 9.2, 10.35 | Two centuries later the Han emperor read the same conversations and recognised what every prince had missed: a… |
| official | 3 | 8.8, 8.16, 9.38 | Confucianism was promulgated as the official state philosophy, and across the next two millennia it shaped the… |
| corporate | 3 | 8.8, 10.22, 10.33 | Confucianism was promulgated as the official state philosophy, and across the next two millennia it shaped the… |
| cuisine | 3 | 8.9, 8.15, 9.16 | The whole system, Taoism, penetrates Chinese medicine, martial arts, geomancy, and cuisine through the complem… |
| neither | 3 | 8.9, 8.22, 10.32 | The whole system, Taoism, penetrates Chinese medicine, martial arts, geomancy, and cuisine through the complem… |
| standardised | 3 | 8.10, 9.29, 10.27 | He standardised the script, the coinage, the units of length and weight, and abolished hereditary aristocracy … |
| soldiers | 3 | 8.10, 9.37, 10.3 | To extend his rule beyond the grave, he commissioned a buried army of several thousand life-sized terracotta s… |
| peasants | 3 | 8.10, 9.36, 9.37 | To extend his rule beyond the grave, he commissioned a buried army of several thousand life-sized terracotta s… |
| meditative | 3 | 8.11, 8.17, 9.44 | Chan crossed the sea into Japan and developed into Zen, generating in turn the meditative tea ceremony, the fl… |
| ceremony | 3 | 8.11, 8.17, 9.7 | Chan crossed the sea into Japan and developed into Zen, generating in turn the meditative tea ceremony, the fl… |
| withdraw | 3 | 8.12, 9.53, 9.54 | In the twentieth century a slight Indian lawyer named Mahatma Gandhi adapted the Hindu doctrines of non-violen… |
| painters | 3 | 8.13, 9.38 | The Tang dynasty capital of Chang'an was the largest international city in the world during its century, its a… |
| inventions | 3 | 8.13, 10.13, 10.37 | Across the same span China generated four inventions that eventually reshaped the entire planet: paper, which … |
| copying | 3 | 8.13, 9.9, 9.10 | Across the same span China generated four inventions that eventually reshaped the entire planet: paper, which … |
| carved | 3 | 8.14, 9.1, 10.7 | Tang dynasty Buddhist monks first carved entire sutras onto wooden blocks and printed multiple copies of each … |
| scientist | 3 | 8.14, 9.32, 10.21 | Bi Sheng himself died in relative obscurity in China, his name preserved only because a contemporary scientist… |
| notebooks | 3 | 8.14, 9.14, 9.41 | Bi Sheng himself died in relative obscurity in China, his name preserved only because a contemporary scientist… |
| eastward | 3 | 8.15, 9.16, 10.1 | Along its caravan tracks travelled Buddhist scriptures from India into China, papermaking from China into the … |
| bubonic | 3 | 8.16, 9.12, 9.25 | The same road, decades later, conveyed the bubonic plague from the Asian steppes into the Crimean ports and on… |
| cholera | 3 | 8.19, 9.39, 9.40 | The South Asian monsoon faltered, and a cholera epidemic erupted from Bengal that eventually traversed every c… |
| economy | 3 | 8.20 | The economy stagnated.… |
| special | 3 | 8.20, 8.21, 9.41 | A short pragmatic leader named Deng Xiaoping initiated a series of reforms now collectively designated Reform … |
| operating | 3 | 8.21, 9.30, 10.21 | The telecommunications company Huawei, when sanctioned by the United States and denied access to American semi… |
| construction | 3 | 8.21, 9.17, 10.29 | The Made in China 2025 strategy declared the intention to achieve self-sufficiency in artificial intelligence,… |
| studies | 3 | 8.22, 9.55 | Rather than enter institutional employment upon graduation, she leveraged the saturating new mobile internet i… |
| growing | 2 | 8.1, 9.55 | The crust at the boundary had nowhere to go but upward, and the entire region buckled into a colossal vertical… |
| rainforests | 2 | 8.1, 8.4 | The same range severed the dry cold air arriving from the north and forced the humid air ascending from the In… |
| wolves | 2 | 8.2, 10.23 | The Tibetan antelope has developed a specialised form of haemoglobin that binds oxygen more efficiently at alt… |
| pursue | 2 | 8.2, 10.27 | The Tibetan antelope has developed a specialised form of haemoglobin that binds oxygen more efficiently at alt… |
| non-human | 2 | 8.4, 8.6 | The orangutan, the great red-haired ape of Borneo and Sumatra, has been observed tearing a leaf from a tree an… |
| flower | 2 | 8.4, 8.11 | The rafflesia, the largest flower on the planet, blooms across a metre of forest floor without possessing any … |
| dropped | 2 | 8.6, 10.1 | On a small Japanese island, a single young female macaque was observed picking up a sweet potato that had been… |
| lowlands | 2 | 8.7, 10.2 | In the marshy lowlands along the lower Yangtze River, prehistoric farmers gradually domesticated a small-grain… |
| kingdom | 2 | 8.8, 9.20 | In the fifth century before the common era, an unemployed clerk named Confucius walked from one Chinese kingdo… |
| husband | 2 | 8.8, 9.32 | Husband considerate to wife.… |
| missed | 2 | 8.8, 9.37 | Two centuries later the Han emperor read the same conversations and recognised what every prince had missed: a… |
| millennia | 2 | 8.8, 8.18 | Confucianism was promulgated as the official state philosophy, and across the next two millennia it shaped the… |
| shaped | 2 | 8.8, 10.19 | Confucianism was promulgated as the official state philosophy, and across the next two millennia it shaped the… |
| dynasties | 2 | 8.8, 10.28 | The Sui and Tang dynasties devised the imperial examination, an open written test of the Confucian canon throu… |
| dictating | 2 | 8.8, 9.11 | The man who could not persuade a single prince to take him seriously had ended up dictating the rules by which… |
| subjects | 2 | 8.9, 9.22 | Where Confucius had advocated active moral cultivation, Laozi articulated the opposite: the best ruler is the … |
| pursued | 2 | 8.9, 9.15 | His spiritual descendant Zhuangzi pursued the same intuition further, asking whether the philosopher had dream… |
| complementary | 2 | 8.9, 10.20 | The whole system, Taoism, penetrates Chinese medicine, martial arts, geomancy, and cuisine through the complem… |
| throne | 2 | 8.10, 9.48 | A king of the western Chinese state of Qin, named Ying Zheng, spent a decade conquering the six other warring … |
| pressing | 2 | 8.10, 8.14 | To restrain the nomadic horsemen pressing in from the north, he connected the existing border walls into the f… |
| existing | 2 | 8.10, 9.5 | To restrain the nomadic horsemen pressing in from the north, he connected the existing border walls into the f… |
| version | 2 | 8.10, 9.25 | To restrain the nomadic horsemen pressing in from the north, he connected the existing border walls into the f… |
| warrior | 2 | 8.10, 9.45 | To extend his rule beyond the grave, he commissioned a buried army of several thousand life-sized terracotta s… |
| meditation | 2 | 8.11, 8.12 | He emerged from the meditation as the Buddha, and the teaching he subsequently transmitted spread across South… |
| treated | 2 | 8.13, 9.55 | The Tang calligraphers treated each brush stroke as a breathing thing; the Song landscape painters mastered th… |
| receding | 2 | 8.13, 9.7 | The Tang calligraphers treated each brush stroke as a breathing thing; the Song landscape painters mastered th… |
| printing | 2 | 8.13, 9.18 | Across the same span China generated four inventions that eventually reshaped the entire planet: paper, which … |
| copies | 2 | 8.14, 9.5 | Tang dynasty Buddhist monks first carved entire sutras onto wooden blocks and printed multiple copies of each … |
| world's | 2 | 8.14, 10.1 | Several centuries later a Song dynasty craftsman named Bi Sheng improved on the technique by carving each char… |
| catalysed | 2 | 8.14, 9.45 | The Chinese technology eventually propagated westward across the Silk Road and emerged in Europe four centurie… |
| steppe | 2 | 8.15, 8.16 | The same road also conveyed the most lethal of its passengers: the plague bacterium, riding in the gut of flea… |
| operated | 2 | 8.16, 9.22 | Within the Mongol empire the Silk Road operated with unprecedented security: a single travel pass issued by th… |
| harassment | 2 | 8.16, 10.28 | Within the Mongol empire the Silk Road operated with unprecedented security: a single travel pass issued by th… |
| served | 2 | 8.16, 9.29 | Within the Mongol empire the Silk Road operated with unprecedented security: a single travel pass issued by th… |
| steppes | 2 | 8.16, 8.23 | The same road, decades later, conveyed the bubonic plague from the Asian steppes into the Crimean ports and on… |
| harbour | 2 | 8.16, 10.9 | The same road, decades later, conveyed the bubonic plague from the Asian steppes into the Crimean ports and on… |
| loyalty | 2 | 8.17, 9.11 | The medieval samurai class devised bushido, an ethical code in which loyalty, honour, and composure in the fac… |
| honourable | 2 | 8.17, 9.11 | The medieval samurai class devised bushido, an ethical code in which loyalty, honour, and composure in the fac… |
| imported | 2 | 8.17, 10.10 | Zen Buddhism, imported from China, evolved into the austere dry-garden contemplation, the once-in-a-lifetime t… |
| austere | 2 | 8.17, 8.20 | Zen Buddhism, imported from China, evolved into the austere dry-garden contemplation, the once-in-a-lifetime t… |
| sensibility | 2 | 8.17, 9.34 | The post-war animator Hayao Miyazaki, the director Akira Kurosawa, and the novelist Haruki Murakami have toget… |
| addiction | 2 | 8.18, 9.20 | By the eighteenth century the British had developed an addiction to Chinese tea so thorough that they were exh… |
| unrelenting | 2 | 8.19, 9.32 | European harvests collapsed, and a young Mary Shelley, trapped indoors on the shore of Lake Geneva by the unre… |
| gothic | 2 | 8.19, 9.8 | A single Indonesian eruption reshaped global food production, the history of the gothic novel, and modern chem… |
| planning | 2 | 8.20, 10.35 | After a century of foreign humiliation, civil war, and revolutionary upheaval, China entered a period of auste… |
| shenzhen | 2 | 8.20, 8.21 | A short pragmatic leader named Deng Xiaoping initiated a series of reforms now collectively designated Reform … |
| manufacturers | 2 | 8.21, 10.37 | The Chinese manufacturers BYD and CATL eventually dominated the global market for electric vehicles and lithiu… |
| batteries | 2 | 8.21, 10.37 | The Chinese manufacturers BYD and CATL eventually dominated the global market for electric vehicles and lithiu… |
| families | 2 | 8.22, 9.36 | To curb the demographic explosion that had accompanied the early decades of the People's Republic, the central… |
| daughter | 2 | 8.22, 9.33 | sealyra was born into precisely this demographic interlude, an only daughter saturated from infancy with the u… |
| grandparents | 2 | 8.22, 10.5 | sealyra was born into precisely this demographic interlude, an only daughter saturated from infancy with the u… |
| educational | 2 | 8.22, 10.15 | She matriculated through the formal Chinese educational apparatus, qualified for an art conservatoire as an ad… |
| adolescent | 2 | 8.22, 9.42 | She matriculated through the formal Chinese educational apparatus, qualified for an art conservatoire as an ad… |
| representative | 2 | 8.22, 10.34 | She is, in this sense, neither a representative of her generation nor an exception to it, but a single recorde… |
| treeless | 2 | 8.23, 10.4 | The paleolithic peoples of north Asia, ancestors of every indigenous community from Siberia to Alaska, organis… |
| rested | 2 | 8.23, 10.32 | Their economic system rested on the barter exchange of meat, hide, and bone across small kin-based bands that … |
| provided | 2 | 8.23, 10.4 | The neolithic transition arrived later in the north Asian steppes than in southern river valleys, eventually l… |
| spirit | 2 | 8.23, 9.51 | Across the entire Eurasian Arctic, from Saami Lapland through Siberian Evenki to coastal Inuit, the indigenous… |
| academic | 2 | 8.23, 9.3 | Their accumulated folklore, transmitted across centuries by oral recitation, preserved an entire anthropologic… |

## Chapter 9 (178 orphans)

| Word | Hits | Sections | Sentence excerpt |
|---|---:|---|---|
| public | 11 | 9.12, 9.31, 9.42 | The catastrophe demolished public faith in the religious institutions that had failed to prevent it.… |
| principle | 7 | 9.3, 9.40, 9.42 | Across the sea in Syracuse, the engineer Archimedes leapt from his bath shouting "eureka" upon perceiving the … |
| children | 6 | 9.7, 9.12, 9.30 | The cave at Lascaux in southern France preserves vivid wall paintings of bulls, horses, and stags that may hav… |
| translation | 6 | 9.10, 9.55 | While Western Europe was still copying manuscripts in marginal monasteries, the Abbasid caliphate in Baghdad e… |
| personally | 6 | 9.14, 9.20, 9.24 | Leonardo had dissected his first cadaver as a teenager; Michelangelo personally selected each block of marble … |
| invented | 6 | 9.18, 9.20, 9.25 | The German artisan Gutenberg invented movable metal type and printed the first European Bible, then went bankr… |
| theatre | 6 | 9.22, 9.39, 9.45 | The Italian Caravaggio illuminated his subjects as if a theatre spotlight had cracked the surrounding darkness… |
| twentieth-century | 6 | 9.36, 9.44, 9.47 | Crime and Punishment dissects the mental collapse of a poor student who murders a pawnbroker, while The Brothe… |
| popular | 5 | 9.6, 9.49, 10.12 | The names Odin, Thor, and Valkyrie, preserved in those sagas, continue to populate the popular cinema of the p… |
| actually | 5 | 9.15, 9.44, 9.50 | The Dutchman Hieronymus Bosch painted the triptych Garden of Earthly Delights, populated with bird-headed huma… |
| parallel | 5 | 9.20, 9.27, 9.48 | A glover's son and an unmarried queen, working in parallel through language and through fleet, had together op… |
| corporation | 5 | 9.21, 10.15, 10.33 | All this occurred under the financial superstructure of the Dutch East India Company, the first multinational … |
| workers | 5 | 9.30, 10.10, 10.14 | The Luddites, displaced textile workers, smashed the machines that had replaced them and were hanged for treas… |
| citizens | 4 | 9.2, 9.3, 10.21 | In the ancient city of Athens the free male citizens convened on a hilltop assembly and voted directly on ever… |
| calculated | 4 | 9.2, 9.16, 9.19 | In the same century, a librarian named Eratosthenes calculated the circumference of the planet using nothing b… |
| divine | 4 | 9.8, 9.9, 9.12 | Theologians of the period had pronounced that light was the most refined form in which the divine could manife… |
| exiled | 4 | 9.9, 9.27, 9.32 | The exiled Florentine Dante Alighieri composed The Divine Comedy in the Tuscan vernacular of his native city, … |
| entertainment | 4 | 9.11, 9.39, 10.28 | Their principal entertainment was the joust, in which mounted knights charged each other with long lances, att… |
| canvas | 4 | 9.17, 9.38, 9.47 | The court painter Velázquez inserted himself into his own canvas in Las Meninas, generating a visual puzzle so… |
| tradition | 4 | 9.19, 9.37, 9.50 | Galileo recanted publicly and was confined to house arrest for the remainder of his life, though tradition rec… |
| overturned | 4 | 9.23, 9.35, 10.27 | Together these two books overturned a millennium of received medical doctrine.… |
| career | 4 | 9.28, 9.35, 10.15 | The German Bach wrote several hundred cantatas across his career as a provincial church musician, dying in obs… |
| engine | 4 | 9.30, 10.37 | The Scottish engineer James Watt, repairing a worn Newcomen steam engine, perceived that adding a separate con… |
| capitalism | 4 | 9.35, 9.51 | The German political economist Marx spent decades in the reading room of the British Museum drafting Das Kapit… |
| studio | 4 | 9.38, 9.50, 10.24 | They abandoned the dark studio in favour of working outdoors directly from the changing light, capturing the s… |
| engineering | 4 | 9.41, 10.27, 10.36 | The same century redrew the foundations of classical mechanics itself: physicists rewrote the laws governing e… |
| equivalence | 4 | 9.41, 9.49, 9.55 | The Swiss patent clerk Einstein then articulated special relativity and the equivalence of mass and energy, re… |
| half-century | 4 | 9.50, 10.17, 10.20 | Every independent film made anywhere on the planet across the following half-century inherits something from t… |
| statistical | 4 | 9.51, 10.34 | The French sociologist Durkheim demonstrated through statistical analysis of suicide that even the most appare… |
| universities | 4 | 9.55, 10.15, 10.27 | European universities accordingly restructured their language curriculum to incorporate translation as a disci… |
| melting | 3 | 9.1, 9.17, 9.47 | As the melting glaciers receded, their meltwater carved the deep narrow fjords that now penetrate the western … |
| engineer | 3 | 9.3, 9.30 | Across the sea in Syracuse, the engineer Archimedes leapt from his bath shouting "eureka" upon perceiving the … |
| monasteries | 3 | 9.6, 9.9, 9.10 | The Vikings raided the coastal monasteries of England, colonised Iceland and Greenland, and reached the Newfou… |
| protection | 3 | 9.11, 10.23, 10.29 | The whole class was governed by an explicit code called chivalry: protection of women, loyalty to the king, ho… |
| institutions | 3 | 9.12, 9.51, 10.15 | The catastrophe demolished public faith in the religious institutions that had failed to prevent it.… |
| dissected | 3 | 9.14, 9.23 | Leonardo da Vinci painted the Mona Lisa during the day and dissected human cadavers in secret at night, record… |
| document | 3 | 9.18, 10.33 | Gutenberg's press copied his document across the entire German-speaking world within months.… |
| publicly | 3 | 9.19, 9.25, 10.33 | Galileo recanted publicly and was confined to house arrest for the remainder of his life, though tradition rec… |
| everywhere | 3 | 9.21, 10.34, 10.35 | All this occurred under the financial superstructure of the Dutch East India Company, the first multinational … |
| medical | 3 | 9.23 | Medieval European authorities had prohibited the dissection of human cadavers, so European medical textbooks c… |
| closed | 3 | 9.23, 9.25, 10.32 | The English physician Harvey measured the volume of blood pumped per minute by the heart, demonstrated that th… |
| chamber | 3 | 9.24, 9.30, 10.7 | He shut himself into a heated chamber in Germany and methodically doubted every belief he held until he arrive… |
| newton | 3 | 9.25 | When the bubonic plague closed Cambridge, a young undergraduate named Isaac Newton retreated to the family far… |
| dedicated | 3 | 9.25, 9.39, 9.55 | Newton dedicated more of his energy to alchemy and biblical prophecy than to physics, with results he himself … |
| biblical | 3 | 9.25, 9.33, 10.12 | Newton dedicated more of his energy to alchemy and biblical prophecy than to physics, with results he himself … |
| published | 3 | 9.25, 9.55, 10.23 | Newton dedicated more of his energy to alchemy and biblical prophecy than to physics, with results he himself … |
| neighbouring | 3 | 9.26, 10.31, 10.35 | The cathedral survived the German blitz of the Second World War when every neighbouring street had been demoli… |
| intellectual | 3 | 9.27, 10.22, 10.34 | The intellectual centre of European Europe migrated from the monastery and the royal salon into the cafés of e… |
| economist | 3 | 9.27, 9.35, 9.51 | The Scottish economist Adam Smith, working in parallel, articulated the doctrine of the invisible hand by whic… |
| autumn | 3 | 9.28, 10.5, 10.8 | The Venetian Vivaldi composed The Four Seasons, in which violins and orchestra paint the bird-song of spring, … |
| consolidated | 3 | 9.29, 10.15, 10.25 | The three composers who consolidated the classical symphony all converged on imperial Vienna across a single c… |
| patrons | 3 | 9.29, 10.29 | Mozart played the piano in front of European courts from the age of three, composed operas, symphonies, and co… |
| factories | 3 | 9.30, 10.16 | His improved steam engine, installed across the textile factories of northern England, generated the mechanica… |
| additional | 3 | 9.31, 9.33, 10.1 | The revolutionary leader Robespierre, presiding over the Committee of Public Safety, dispatched several thousa… |
| dramatically | 3 | 9.33, 9.40, 10.30 | Her findings forced Victorian Britain to accept that species could become extinct, that the planet had support… |
| concealing | 3 | 9.34, 9.39, 10.33 | Jane Austen, writing in the parlour of a rural rectory, articulated the layered subtleties of the country gent… |
| meaning | 3 | 9.35, 9.55 | The later German philosopher Nietzsche overturned all such consolatory metaphysics with the announcement that … |
| clinical | 3 | 9.36, 10.31 | Chekhov, a country doctor, wrote short stories and plays of a clinical understated precision.… |
| chemist | 3 | 9.40, 9.41, 10.37 | The French chemist Pasteur demonstrated through controlled experiments that fermentation and infectious diseas… |
| microscopic | 3 | 9.40, 10.32 | The French chemist Pasteur demonstrated through controlled experiments that fermentation and infectious diseas… |
| physicists | 3 | 9.41, 10.17 | The same century redrew the foundations of classical mechanics itself: physicists rewrote the laws governing e… |
| revival | 3 | 9.42, 9.45 | The French baron Coubertin, having read about the ancient Olympic Games, devised a modern revival in which ath… |
| childhood | 3 | 9.44, 9.50, 10.25 | The neurologist Freud encouraged his patients to recline on a couch and articulate whatever entered consciousn… |
| ending | 3 | 9.49, 10.11, 10.17 | The American Manhattan Project converted Einstein's mass-energy equivalence into the atomic bombs that ultimat… |
| departed | 3 | 9.50, 10.5, 10.26 | Fellini, raised in the same neorealist tradition, eventually departed from it into the dreamlike autobiography… |
| election | 3 | 9.51, 10.11, 10.34 | The German sociologist Weber argued in The Protestant Ethic and the Spirit of Capitalism that capitalism had e… |
| languages | 3 | 9.53, 9.55, 10.18 | The federation of Yugoslavia held together six south Slavic republics, four languages, and three religions und… |
| warfare | 3 | 9.54, 10.2, 10.30 | The first significant fracture arrived when Britain voted to withdraw from the union, and the second arrived w… |
| hollowed | 2 | 9.1, 9.8 | Each glaciation ground southward across the landmass, hollowed out the basin of the North Sea, depressed the l… |
| principles | 2 | 9.2, 9.27 | The ancient Greeks had demonstrated that the human mind, applied with sufficient discipline, could establish b… |
| wealthy | 2 | 9.3, 9.13 | Socrates roamed the Athenian agora interrogating politicians and wealthy citizens with relentless questions ab… |
| condemned | 2 | 9.3, 9.36 | Socrates roamed the Athenian agora interrogating politicians and wealthy citizens with relentless questions ab… |
| assigned | 2 | 9.3, 9.48 | Plato's own student Aristotle reversed the doctrine, insisting that the Forms reside within ordinary objects, … |
| drinking | 2 | 9.4, 10.36 | The aqueducts that delivered fresh water to the patrician households were constructed from lead piping, and le… |
| darkness | 2 | 9.5, 9.22 | When the Western Roman Empire collapsed beneath the migrating tribes, Western Europe entered a millennium of a… |
| copied | 2 | 9.5, 9.18 | It survived through the earnest persistence of a handful of monks on the remote islands of Ireland, who, in co… |
| accidentally | 2 | 9.5, 10.14 | Those marginal doodles, far from undermining the manuscripts, accidentally protected them from neglect.… |
| engineered | 2 | 9.6, 10.36 | The Vikings of Scandinavia engineered a kind of long shallow-draft vessel called the longship, light enough to… |
| warriors | 2 | 9.6, 10.9 | Lacking any written script, the Vikings transmitted their oral history through epic narratives called sagas, w… |
| transferred | 2 | 9.8, 9.16 | Medieval European builders devised a structural innovation called the flying buttress, an external supporting … |
| relieved | 2 | 9.8, 9.12 | Walls relieved of that thrust could be hollowed out for enormous windows, and stained glass installed in those… |
| theological | 2 | 9.8, 9.19 | Walls relieved of that thrust could be hollowed out for enormous windows, and stained glass installed in those… |
| buildings | 2 | 9.8, 10.26 | Theologians of the period had pronounced that light was the most refined form in which the divine could manife… |
| adding | 2 | 9.8, 9.30 | Notre Dame de Paris required more than a century to complete, with successive generations of masons inheriting… |
| farming | 2 | 9.9, 10.36 | Medieval Benedictine monks structured their existence around the doctrine that work itself constituted prayer,… |
| remembered | 2 | 9.10, 10.16 | While Western Europe was still copying manuscripts in marginal monasteries, the Abbasid caliphate in Baghdad e… |
| rendered | 2 | 9.10, 9.49 | While Western Europe was still copying manuscripts in marginal monasteries, the Abbasid caliphate in Baghdad e… |
| mathematician | 2 | 9.10, 9.25 | The Persian mathematician al-Khwarizmi composed there a textbook whose Arabic title, al-jabr, would eventually… |
| broken | 2 | 9.11, 9.34 | Their principal entertainment was the joust, in which mounted knights charged each other with long lances, att… |
| prevented | 2 | 9.12, 9.32 | The resulting witch hunts persisted for three centuries and executed approximately eighty thousand women, the … |
| authorised | 2 | 9.12, 9.20 | The resulting witch hunts persisted for three centuries and executed approximately eighty thousand women, the … |
| scaffold | 2 | 9.13, 9.31 | The traditional approach required scaffolding from the ground, and the cathedral was too tall to scaffold.… |
| double-shell | 2 | 9.13, 9.26 | A trained goldsmith named Brunelleschi devised a revolutionary solution: a double-shell dome in which two conc… |
| marble | 2 | 9.13, 9.14 | His working blueprint demonstrated a strict mathematical symmetry, and the marble facade of the cathedral acqu… |
| geometric | 2 | 9.13, 9.15 | His working blueprint demonstrated a strict mathematical symmetry, and the marble facade of the cathedral acqu… |
| building | 2 | 9.13, 9.47 | His working blueprint demonstrated a strict mathematical symmetry, and the marble facade of the cathedral acqu… |
| politics | 2 | 9.13, 9.51 | The wealthy banking dynasty of the Medici, originally wool merchants, controlled Florentine politics, patronis… |
| permanently | 2 | 9.14, 9.51 | Michelangelo painted the ceiling of the Sistine Chapel lying on his back for four years, after which his cervi… |
| philosophers | 2 | 9.14, 9.27 | Raphael, the youngest of the three, assembled all the major Greek philosophers in his fresco The School of Ath… |
| garden | 2 | 9.15, 9.38 | The Dutchman Hieronymus Bosch painted the triptych Garden of Earthly Delights, populated with bird-headed huma… |
| killed | 2 | 9.16, 9.24 | The Portuguese captain Magellan attempted the first complete circumnavigation; he himself was killed in the Ph… |
| eighteen | 2 | 9.16, 9.25 | The Portuguese captain Magellan attempted the first complete circumnavigation; he himself was killed in the Ph… |
| charges | 2 | 9.17, 10.10 | The Castilian writer Cervantes composed Don Quixote, in which an elderly gentleman addled by chivalric novels … |
| universally | 2 | 9.17, 9.27 | The Castilian writer Cervantes composed Don Quixote, in which an elderly gentleman addled by chivalric novels … |
| civilians | 2 | 9.17, 10.30 | Goya documented the Napoleonic massacre of Madrid civilians in The Third of May.… |
| recognisable | 2 | 9.17, 9.47 | The flamenco of southern Andalusia, originally improvised by the Roma communities through stamping heels and p… |
| bankrupt | 2 | 9.18, 9.22 | The German artisan Gutenberg invented movable metal type and printed the first European Bible, then went bankr… |
| friend | 2 | 9.19, 9.35 | The conclusion terrified him sufficiently that he suppressed the manuscript until his deathbed, by which point… |
| pressed | 2 | 9.19, 9.30 | The conclusion terrified him sufficiently that he suppressed the manuscript until his deathbed, by which point… |
| threat | 2 | 9.19, 10.32 | The Roman Inquisition summoned him to confess heresy under the explicit threat of torture.… |
| courtroom | 2 | 9.19, 10.32 | Galileo recanted publicly and was confined to house arrest for the remainder of his life, though tradition rec… |
| small-town | 2 | 9.20, 9.37 | The son of a small-town glove-maker grew up to write thirty-seven plays and one hundred fifty-four sonnets tha… |
| thirty-seven | 2 | 9.20, 9.38 | The son of a small-town glove-maker grew up to write thirty-seven plays and one hundred fifty-four sonnets tha… |
| bedroom | 2 | 9.20, 9.46 | Shakespeare invented or first attested vocabulary so basic that contemporary speakers cannot perceive its prov… |
| sketched | 2 | 9.21, 9.22 | He sketched these creatures and posted his drawings to the Royal Society in London, where the entire Western w… |
| unaided | 2 | 9.21, 9.40 | He sketched these creatures and posted his drawings to the Royal Society in London, where the entire Western w… |
| baroque | 2 | 9.22, 9.28 | Baroque painting abandoned the calm clarity of the Renaissance in favour of high contrast and emotional violen… |
| master | 2 | 9.22, 10.33 | The Dutch Rembrandt produced more than a hundred self-portraits across his lifetime, unflinchingly documenting… |
| courts | 2 | 9.22, 9.29 | The Flemish Rubens operated a vast painting workshop in which he sketched the composition and assistants compl… |
| experimentation | 2 | 9.24, 10.37 | The statement "I think, therefore I am" thereby became the founding axiom of modern rationalism, and Western p… |
| presiding | 2 | 9.25, 9.31 | Newton, presiding over the Royal Society, denounced Leibniz publicly as a plagiarist, although modern historia… |
| bombardment | 2 | 9.26, 9.48 | The cathedral survived the German blitz of the Second World War when every neighbouring street had been demoli… |
| argued | 2 | 9.27, 9.51 | Rousseau argued in The Social Contract that all human beings are born free yet are nevertheless universally en… |
| mutual | 2 | 9.27, 9.48 | Montesquieu proposed that legislative, executive, and judicial powers must be separated and held in mutual res… |
| chorus | 2 | 9.28, 10.25 | The German Handel migrated to London, wrote commercially successful operas and oratorios, and authored the Hal… |
| recognises | 2 | 9.28, 9.51 | The German Handel migrated to London, wrote commercially successful operas and oratorios, and authored the Hal… |
| singer | 2 | 9.29, 10.12 | He completed his Ninth Symphony after he had become completely deaf, and at its premiere had to be turned by a… |
| worker | 2 | 9.30, 10.15 | The spinning jenny enabled one worker to operate eight spindles simultaneously, and factory owners pressed chi… |
| smashed | 2 | 9.30, 9.49 | The Luddites, displaced textile workers, smashed the machines that had replaced them and were hanged for treas… |
| industrialised | 2 | 9.30, 10.11 | The engineer Stephenson eventually mounted the steam engine on rails, and the resulting locomotive network con… |
| monarchy | 2 | 9.31, 10.4 | The French king Louis XVI was conducted to the public scaffold in Paris and beheaded by guillotine before a ch… |
| safety | 2 | 9.31, 10.37 | The revolutionary leader Robespierre, presiding over the Committee of Public Safety, dispatched several thousa… |
| officer | 2 | 9.31, 10.32 | Into the resulting vacuum stepped a short Corsican artillery officer named Napoleon, who crowned himself emper… |
| escaped | 2 | 9.31, 9.49 | Into the resulting vacuum stepped a short Corsican artillery officer named Napoleon, who crowned himself emper… |
| fought | 2 | 9.31, 9.48 | Into the resulting vacuum stepped a short Corsican artillery officer named Napoleon, who crowned himself emper… |
| tuberculosis | 2 | 9.32, 9.40 | The poet Keats, dying of tuberculosis in Rome at twenty-five, composed Ode to a Nightingale knowing he would n… |
| romantic | 2 | 9.32, 9.37 | The English Romantic period burned briefly and intensely.… |
| burned | 2 | 9.32, 10.4 | The English Romantic period burned briefly and intensely.… |
| furniture | 2 | 9.33, 9.52 | A twelve-year-old English girl named Mary Anning, daughter of a furniture repairman on the south coast of Dors… |
| findings | 2 | 9.33, 9.41 | Her findings forced Victorian Britain to accept that species could become extinct, that the planet had support… |
| dignity | 2 | 9.34, 9.37 | The Brontë sisters, raised in a Yorkshire parsonage, produced Jane Eyre, the chronicle of a governess who refu… |
| homosexuality | 2 | 9.34, 9.39 | Oscar Wilde, the wittiest playwright of the century, was eventually convicted for homosexuality, sentenced to … |
| reading | 2 | 9.35, 9.44 | The German political economist Marx spent decades in the reading room of the British Museum drafting Das Kapit… |
| embraced | 2 | 9.35, 9.37 | Nietzsche himself, in his final lucid moment, embraced a beaten cart horse in the streets of Turin and dissolv… |
| tracking | 2 | 9.36, 10.1 | The Russian aristocrat Tolstoy left his estate to labour alongside the peasants in his own fields, wrote War a… |
| railway | 2 | 9.36, 10.35 | He eventually abandoned the estate altogether in old age and died in a small railway station having walked out… |
| firing | 2 | 9.36, 10.31 | Dostoevsky, condemned to execution in his youth and reprieved only at the moment the firing squad raised its r… |
| experience | 2 | 9.36, 9.46 | Dostoevsky, condemned to execution in his youth and reprieved only at the moment the firing squad raised its r… |
| brothers | 2 | 9.36, 10.14 | Crime and Punishment dissects the mental collapse of a poor student who murders a pawnbroker, while The Brothe… |
| competing | 2 | 9.37, 10.21 | After the French Revolution, painting split into competing schools.… |
| rejected | 2 | 9.37, 9.38 | Courbet rejected such allegory in favour of stark realism, declaring that he had never seen an angel and would… |
| declaring | 2 | 9.37, 10.24 | Courbet rejected such allegory in favour of stark realism, declaring that he had never seen an angel and would… |
| canvases | 2 | 9.38, 10.24 | Monet repainted his garden water lilies hundreds of times across his old age, his fading eyesight pushing the … |
| nineteenth-century | 2 | 9.39, 9.42 | The nineteenth-century opera house became the centre of European bourgeois entertainment.… |
| famously | 2 | 9.39, 10.13 | The Polish émigré Chopin composed piano nocturnes of an unrepeatable melancholy and conducted a famously turbu… |
| deliberate | 2 | 9.39, 10.20 | The Russian Tchaikovsky composed Swan Lake and The Nutcracker while concealing his homosexuality from a hostil… |
| experimentalist | 2 | 9.41, 10.13 | The English experimentalist Faraday, a blacksmith's son, discovered electromagnetic induction.… |
| nation | 2 | 9.42, 9.43 | The French baron Coubertin, having read about the ancient Olympic Games, devised a modern revival in which ath… |
| spoken | 2 | 9.45, 10.12 | The dramatist Synge wrote The Playboy of the Western World in the spoken dialect of rural Connacht, provoking … |
| search | 2 | 9.46, 10.22 | Proust composed seven volumes of In Search of Lost Time from a soundproofed bedroom, the entire project ignite… |
| sarajevo | 2 | 9.48, 9.53 | A Serbian nationalist named Princip shot the heir to the Austro-Hungarian throne in the streets of Sarajevo, a… |
| dragged | 2 | 9.48, 10.16 | A Serbian nationalist named Princip shot the heir to the Austro-Hungarian throne in the streets of Sarajevo, a… |
| assault | 2 | 9.48, 10.28 | The infantry assault, the dominant battle technique of the previous three centuries, collapsed against the mac… |
| machine | 2 | 9.48, 10.21 | The infantry assault, the dominant battle technique of the previous three centuries, collapsed against the mac… |
| armies | 2 | 9.48, 10.15 | The opposing armies on the Western Front therefore burrowed into parallel trenches and fought the same few kil… |
| albert | 2 | 9.49, 10.17 | Albert Einstein, who was himself Jewish, escaped to America and warned the American president Roosevelt that G… |
| inaugurating | 2 | 9.49, 10.26 | The American Manhattan Project converted Einstein's mass-energy equivalence into the atomic bombs that ultimat… |
| casting | 2 | 9.50, 10.5 | Italian Neorealism took the camera out of the studio into the rubble of the bombed cities, casting non-profess… |
| wealth | 2 | 9.51, 10.15 | The German sociologist Weber argued in The Protestant Ethic and the Spirit of Capitalism that capitalism had e… |
| enlightenment | 2 | 9.51, 10.4 | The Scottish enlightenment had earlier proposed altruism and benevolence as the natural ethical pair to self-i… |
| capitalist | 2 | 9.51, 9.54 | Contemporary social theory recognises that the empowerment of marginalised populations, not merely their accom… |
| periodically | 2 | 9.52, 10.33 | The polar sky above them ignites periodically with the green and violet curtains of the aurora, and the midsum… |
| presidency | 2 | 9.53, 10.11 | The federation of Yugoslavia held together six south Slavic republics, four languages, and three religions und… |
| politically | 2 | 9.53, 10.29 | Roughly one hundred and fifty thousand died across the entire disintegration, and the borders the wars produce… |
| invaded | 2 | 9.54, 10.30 | The first significant fracture arrived when Britain voted to withdraw from the union, and the second arrived w… |
| speech | 2 | 9.55, 10.11 | The Swiss linguist Ferdinand de Saussure articulated, in lectures published only after his death, the structur… |
| worldwide | 2 | 9.55, 10.25 | The American Noam Chomsky proposed, with worldwide consequences, that every human infant arrives with a univer… |
| physical | 2 | 9.55, 10.22 | Modern linguistics divides into phonetics, the study of physical sound; syntax, the study of grammatical struc… |

## Chapter 10 (38 orphans)

| Word | Hits | Sections | Sentence excerpt |
|---|---:|---|---|
| federal | 7 | 10.11, 10.16, 10.18 | Black Americans endured another full century of segregation, lynching, and disenfranchisement before the civil… |
| laboratories | 4 | 10.19, 10.21, 10.22 | Twentieth-century American psychology laboratories conducted a series of experiments that progressively disman… |
| falling | 3 | 10.6, 10.26 | The Niagara River connects Lake Erie to Lake Ontario, descending across a sheer cliff at Niagara Falls in a pe… |
| hunger | 3 | 10.8, 10.10, 10.28 | The first winter eradicated nearly half of the small community through cold, hunger, and disease.… |
| racial | 3 | 10.11, 10.30, 10.32 | Black Americans endured another full century of segregation, lynching, and disenfranchisement before the civil… |
| teenagers | 3 | 10.12, 10.31 | The white singer Elvis Presley adapted Black rhythm and blues into the rock and roll that made an entire gener… |
| personal | 3 | 10.15, 10.21, 10.22 | Rockefeller began with a single Ohio refinery and across his career consolidated ninety per cent of American o… |
| unresolved | 3 | 10.20, 10.27, 10.32 | The Obama-era Affordable Care Act extended healthcare insurance to millions of previously uninsured Americans,… |
| models | 3 | 10.22, 10.34 | American research laboratories then trained large language models on virtually the entire accessible text of t… |
| studios | 3 | 10.25 | A handful of Jewish immigrant entrepreneurs migrated west from New York to the small Los Angeles suburb of Hol… |
| police | 3 | 10.29, 10.32 | A confrontation between police and the patrons of a Manhattan bar called the Stonewall Inn precipitated severa… |
| reaches | 2 | 10.1, 10.31 | Across multiple ice ages the level of the world's oceans dropped sufficiently that a wide land corridor emerge… |
| arrival | 2 | 10.1, 10.5 | The mammoth, the giant ground sloth, the sabre-toothed cat, the giant short-faced bear, the American camel, an… |
| accuracy | 2 | 10.2, 10.34 | Their astronomers had calculated the orbit of Venus with sufficient accuracy to predict its appearances centur… |
| allied | 2 | 10.4, 10.16 | Across the immense grasslands of the North American interior, the Sioux, the Cheyenne, and several allied nati… |
| benjamin | 2 | 10.4, 10.9 | Benjamin Franklin and Thomas Jefferson studied this confederacy explicitly while drafting the American constit… |
| withdrew | 2 | 10.6, 10.30 | The whole landscape from Quebec to Minnesota still bears the scars of glacial scouring: smoothed bedrock, moun… |
| application | 2 | 10.9, 10.36 | Benjamin Franklin flew a kite into a thunderstorm with a key attached to the string, demonstrating that lightn… |
| finding | 2 | 10.9, 10.19 | Benjamin Franklin flew a kite into a thunderstorm with a key attached to the string, demonstrating that lightn… |
| california | 2 | 10.10, 10.30 | Word that gold had been discovered in California provoked hundreds of thousands of prospectors to migrate west… |
| forcibly | 2 | 10.10, 10.19 | To clear the territory for white settlement, the Cherokee, the Choctaw, the Creek, and the Seminole were forci… |
| relied | 2 | 10.11, 10.34 | The northern states, having industrialised earlier, no longer relied on slavery and increasingly opposed it on… |
| restoring | 2 | 10.16, 10.28 | The newly elected president Franklin Roosevelt launched a programme called the New Deal in which the federal g… |
| attack | 2 | 10.16, 10.30 | The Japanese surprise attack on the American naval base at Pearl Harbor dragged the United States into the Sec… |
| resistance | 2 | 10.17, 10.37 | The bombs incinerated Hiroshima and Nagasaki within days of each other, instantly killing approximately a hund… |
| progressively | 2 | 10.19, 10.33 | Twentieth-century American psychology laboratories conducted a series of experiments that progressively disman… |
| incentives | 2 | 10.19, 10.33 | Skinner's behaviourism trained pigeons to perform sequential behaviours through reinforcement schedules, demon… |
| biologist | 2 | 10.20, 10.23 | The American biologist Watson and the British physicist Crick, working at Cambridge with crucial X-ray crystal… |
| affordable | 2 | 10.20, 10.35 | The Obama-era Affordable Care Act extended healthcare insurance to millions of previously uninsured Americans,… |
| pipeline | 2 | 10.25, 10.29 | Across the twentieth century these studios consolidated the entire industrial pipeline from script through pro… |
| adolescents | 2 | 10.25, 10.27 | American film and popular music have so saturated global culture that adolescents in countries the studios hav… |
| gateway | 2 | 10.27, 10.34 | The Scholastic Aptitude Test became the standardised gateway through which American adolescents are sorted int… |
| review | 2 | 10.32, 10.37 | When that verdict is challenged on appeal, the rebuttal must articulate either new evidence or new procedural … |
| management | 2 | 10.33, 10.36 | Across the post-war decades the American Master of Business Administration evolved into the standard credentia… |
| reducing | 2 | 10.33, 10.34 | Apple, under the operational genius of Tim Cook, eventually constructed the most profitable industrial supply … |
| superseded | 2 | 10.33, 10.37 | Outdated and superficial accounting methods have been progressively superseded by software systems that flag e… |
| behaviour | 2 | 10.34, 10.37 | Modern American social science depends absolutely on statistics, and the foundation of any survey is the princ… |
| implemented | 2 | 10.35, 10.36 | Barcelona's neighbouring superblock districts implemented the same principle across several neighbourhoods, re… |
