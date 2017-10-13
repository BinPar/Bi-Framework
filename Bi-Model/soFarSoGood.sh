BRANCH=`git rev-parse --abbrev-ref HEAD`
if [ $BRANCH == "master" ]; then
   echo "===> master check"
   npm run eslint
   npm test
elif [ $BRANCH == "release" ]; then
   echo "===> release check"
   npm run eslint
   npm test
elif [[ $BRANCH == hotfix* ]]; then
   echo "===> hotfixes check"
   npm run eslint
   npm test
else
   echo "===> normal check"
   npm run eslint
fi