# Rename all 44 photos with descriptive names
# PowerShell script

$photosDir = "c:\Users\julien\Documents\sweden-odyssey\photos"

# Category 1: Camping & Indoor (7 photos)
Rename-Item "$photosDir\596484427_10241358039745623_6469534097499243642_n.jpg" "001-indoor-sleeping-station-floor.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\596820401_10241357857181059_6065282982196946461_n.jpg" "002-indoor-sleeping-station-night.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597587810_10241358040145633_4292986584434406919_n.jpg" "003-indoor-exhausted-gear-pile.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\596818505_10241358012384939_2485122034057477409_n.jpg" "004-night-camp-forest-backpacks.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597088263_10241357935183009_9152134578477991984_n.jpg" "005-campfire-cooking-stone-circle.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597320632_10241358028345338_6656695624639913267_n.jpg" "006-forest-bonfire-evening.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597485768_10241358009744873_9116665079291974256_n.jpg" "007-forest-cooking-campfire-prep.jpg" -ErrorAction SilentlyContinue

# Category 2: Mountain/Snow (12 photos)
Rename-Item "$photosDir\596973917_10241357906982304_7583933707268514337_n.jpg" "010-mountain-snow-crossing-line.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597376735_10241357880661646_8529029161793244540_n.jpg" "011-snow-group-photo-summit.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597102718_10241357858781099_2036283618370887119_n.jpg" "012-alpine-snow-lake-vista.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597158011_10241358053385964_4991854319071139687_n.jpg" "013-mountain-rocky-summit-snow.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597179325_10241358061026155_5936687739338065836_n.jpg" "014-mountain-lake-reflection-wetsuit.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597454084_10241358060106132_6679192285878197201_n.jpg" "015-ice-float-swimming-alpine-lake.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597552770_10241357893021955_6363415647981237102_n.jpg" "016-mountain-camp-snow-tents.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597555277_10241357879021605_8228156798129887711_n.jpg" "017-alpine-snowfield-lake-clouds.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597601957_10241358053665971_8514109874243358269_n.jpg" "018-snow-melting-pool-mountain.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\598311491_10241358050385889_7009402548004106958_n.jpg" "019-glacier-ice-block-reflection.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\598701087_10241357871221410_143818014336485659_n.jpg" "020-alpine-meadow-snow-patches.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\598701089_10241357910982404_3275371068107374007_n.jpg" "021-mountain-sunset-silhouettes.jpg" -ErrorAction SilentlyContinue

# Category 3: Lake & Raft (11 photos)
Rename-Item "$photosDir\597633828_10241357923302712_268710531732095661_n.jpg" "030-lake-fishing-raft-calm.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597689606_10241358010224885_307728552291701499_n.jpg" "031-log-raft-background-lifejacket.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597814674_10241357936223035_6516698824517810404_n.jpg" "032-log-raft-three-scouts-paddles.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597825187_10241358038425590_6848989603433059148_n.jpg" "033-lake-fishing-evening-reflection.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597848560_10241357922702697_574455198154936200_n.jpg" "034-log-raft-three-scouts-lake.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597902674_10241358028225335_8166634973023515829_n.jpg" "035-lake-reading-book-raft-iconic.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\598043702_10241358013904977_4986965295276594010_n.jpg" "036-log-rafts-sunset-pink-sky.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\598143977_10241358023425215_5814660884827606926_n.jpg" "037-large-raft-full-group-flag.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\598513604_10241358026905302_8844206536377818148_n.jpg" "038-log-raft-scout-with-flag.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\598569983_10241358025585269_1056327037447666170_n.jpg" "039-island-campsite-pine-trees-sunset.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\600129594_10241358061466166_1063714664637623657_n.jpg" "040-swimming-lake-jump-action.jpg" -ErrorAction SilentlyContinue

# Category 4: River/Stream (4 photos)
Rename-Item "$photosDir\597633828_10241357868061331_5361962036839769831_n.jpg" "050-alpine-stream-crossing-backpacks.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\598263679_10241357905942278_6288953527795111547_n.jpg" "051-metal-bridge-rushing-stream-mountains.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\598692611_10241357858861101_2973710186389776490_n.jpg" "052-waterfall-group-photo-rocks.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\599216416_10241357870341388_8909295901410890842_n.jpg" "053-waterfall-backpacks-alpine-meadow.jpg" -ErrorAction SilentlyContinue

# Category 5: Mountain Vistas (5 photos)
Rename-Item "$photosDir\600072577_10241357905302262_141499451378920404_n.jpg" "060-norwegian-border-peaks-vista.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\597706013_10241358051305912_2869764418202049328_n.jpg" "061-mountain-rest-stop-group.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\598940724_10241357856261036_1734346365557353477_n.jpg" "062-mountain-pass-vista-overlook.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\598977303_10241358011344913_4056332692580821444_n.jpg" "063-alpine-lake-mountain-panorama.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\598980193_10241357858941103_5684017024194837477_n.jpg" "064-mountain-ridge-hiking-vista.jpg" -ErrorAction SilentlyContinue

# Category 6: Gear/Supplies (2 photos)
Rename-Item "$photosDir\598724313_10241358054705997_8610926129544476655_n.jpg" "070-expedition-food-supplies-spread.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\598972761_10241358026345288_294870188448486156_n.jpg" "071-supply-containers-storage.jpg" -ErrorAction SilentlyContinue

# Category 7: Misc (3 photos)  
Rename-Item "$photosDir\598980057_10241357924342738_8848555425805740326_n.jpg" "080-scouts-hiking-trail-forest.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\600072329_10241358038465591_6401563554291434319_n.jpg" "081-mountain-terrain-hiking.jpg" -ErrorAction SilentlyContinue
Rename-Item "$photosDir\600142216_10241357896862051_6669259518785175924_n.jpg" "082-scouts-mountain-activity.jpg" -ErrorAction SilentlyContinue

Write-Host "`n✅ Photo renaming complete! 44 photos renamed with descriptive names."
Write-Host "📁 Location: $photosDir"
Write-Host "📋 See PHOTO_CATALOG.md for complete classification`n"
