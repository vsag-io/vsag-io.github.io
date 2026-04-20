
build:
	mdbook build docs/zh  -d ../../book/docs/zh
	mdbook build docs/en  -d ../../book/docs/en
	mdbook build blogs/zh -d ../../book/blogs/zh
	mdbook build blogs/en -d ../../book/blogs/en
	cp assets/index.html book/index.html

serve-docs-zh:
	mdbook serve docs/zh  -d ../../book/docs/zh  --open
serve-docs-en:
	mdbook serve docs/en  -d ../../book/docs/en  --open
serve-blogs-zh:
	mdbook serve blogs/zh -d ../../book/blogs/zh --open
serve-blogs-en:
	mdbook serve blogs/en -d ../../book/blogs/en --open
