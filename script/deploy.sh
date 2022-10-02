#!/usr/bin/env bash
set -eu
set -o pipefail
# set +e

export canisterType=${1:-online}
# canister=${2:-market}
echo "Deploy ${canisterType} canister"
dfx deploy
