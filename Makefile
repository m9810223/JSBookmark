include Makefiles/git.Makefile

h: ## list commands
	@perl -nle'print $& if m{^[a-zA-Z0-9_-]+:.*?## .*$$}' \
		$(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; \
		{printf "make %-8s -> %s\n", $$1, $$2}'
p: ## github
	npm run deploy
	git add -A
	git commit -m "$(shell date '+%Y/%m/%d %H:%M:%S')"
	git push -uq origin $(shell git branch --show-current)