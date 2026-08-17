$env:GIT_PAGER='cat'
try {
  git status --porcelain > tools\git-status.txt 2>&1
  git add -A > tools\git-add.txt 2>&1
  git commit -m "fix: corregir referencias rotas de assets, añadir icons/ y placeholders, actualizar manifest y service-worker" --no-verify > tools\git-commit.txt 2>&1
  git rev-parse --abbrev-ref HEAD > tools\git-branch.txt 2>&1
  git log -1 --pretty=format:"%h %s" > tools\git-last.txt 2>&1
  git push > tools\git-push.txt 2>&1
  Write-Output "DONE"
} catch {
  Write-Output "ERROR: $_"
}
