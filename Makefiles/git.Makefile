remote_info=$(shell git remote -v | head -n 1 | cut -d" " -f1)
ginit: ## git init
	rm -rf .git
	git init
	git add -A
	git commit -q -m "init"
	git remote add ${remote_info}
	git push -q --set-upstream origin master -f

x: ## chmod +x **/*.sh
	@chmod +x **/*.sh
