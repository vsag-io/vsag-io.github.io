
# Use absolute paths for mdbook's -d to be robust across mdbook versions:
# older mdbook (<=0.4.51) resolves -d relative to the book's root (the
# directory containing book.toml), newer mdbook resolves it relative to the
# current working directory. Absolute paths behave identically in both.

ROOT := $(CURDIR)
BOOK := $(ROOT)/book

build:
	mdbook build docs/zh  -d $(BOOK)/docs/zh
	mdbook build docs/en  -d $(BOOK)/docs/en
	mdbook build blogs/zh -d $(BOOK)/blogs/zh
	mdbook build blogs/en -d $(BOOK)/blogs/en
	cp assets/index.html $(BOOK)/index.html

serve-docs-zh:
	mdbook serve docs/zh  -d $(BOOK)/docs/zh  --open
serve-docs-en:
	mdbook serve docs/en  -d $(BOOK)/docs/en  --open
serve-blogs-zh:
	mdbook serve blogs/zh -d $(BOOK)/blogs/zh --open
serve-blogs-en:
	mdbook serve blogs/en -d $(BOOK)/blogs/en --open
