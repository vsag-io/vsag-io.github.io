
build:
	mdbook build zh -d ../book/zh
	mdbook build en -d ../book/en
	cp assets/index.html book/index.html

serve-zh:
	mdbook serve zh -d ../book/zh --open

serve-en:
	mdbook serve en -d ../book/en --open
