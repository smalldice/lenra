export PATH := $(shell pwd)/node_modules/.bin:$(PATH)
.PHONY: init dev  build clean api

# 项目初始化
init:
	git submodule update --init --recursive
	chmod 777 ./api/script/goctl
	yarn
	
# 开发模式
dev:init
	make api
	yarn run serve

# build到online环境
build:clean
	make init
	make api
	yarn run build
	rm -rf dist/js/*.map

clean:
	rm -rf dist

# api文件与后端沟通好, 需要添加的是哪个文件
# 以阳光作业为例
services = api/xjy/module/studenttask/studenttask.api

api:
	make init
	@$(foreach var, $(services), api/script/goctl api ts -dir  $(dir $(subst api/xjy/,./src/api/,$(var))) -api $(var) -webapi @/api/api )
