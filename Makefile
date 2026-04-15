# Portfolio — common dev tasks (requires GNU Make + npm)
.PHONY: help install ci dev start build lint format check test-all clean

help:
	@echo "Portfolio Makefile"
	@echo ""
	@echo "  make install   Install dependencies (npm install)"
	@echo "  make ci        Clean install from lockfile (npm ci)"
	@echo "  make dev       Clean .next then Next.js dev server"
	@echo "  make start     Production server (run build first)"
	@echo "  make build     Production build"
	@echo "  make lint      ESLint"
	@echo "  make format    Prettier --write"
	@echo "  make check     Prettier check + ESLint + TypeScript + build (no file writes)"
	@echo "  make test-all  Same as npm run test-all"
	@echo "  make clean     Remove .next, out, caches"
	@echo ""

install:
	npm install

ci:
	npm ci

dev: clean
	npm run dev

start:
	npm run start

build:
	npm run build

lint:
	npm run lint

format:
	npm run format

check:
	npm run check-format
	npm run check-lint
	npm run check-types
	npm run build

test-all:
	npm run test-all

clean:
	rm -rf .next out .turbo node_modules/.cache
