# Document Summary Csv Creater

This is Github Action that is create summary list as csv for markdowns.

## Inputs

### dirPaths

Directory paths. delimiter as ','.

### colmuns

CSV colmuns. delimiter as ','.

## Outputs

### csv

Summary csv.

## Example usage

```yaml
- uses: yamatatsu/document-summary-csv-creater@v1.0.1
  with:
    dirPaths: ./sampleFiles
    colmuns: id,owner,expired_on
  id: create_csv

# If you wanna commit to a PR branch.
- name: create csv file
  run: echo '${{ steps.create_csv.outputs.csv }}' > ./sampleFiles/summary.csv
- name: git add
  run: git add -N ./sampleFiles/summary.csv
- uses: stefanzweifel/git-auto-commit-action@v2.1.0
  with:
    commit_message: Apply summary list csv
    branch: ${{ github.head_ref }}
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
