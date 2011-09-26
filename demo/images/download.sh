i=100
while [ $i -le '178' ]
do
  curl -O http://hide.kanari.info/photo/plate/$i.jpg
  i=`expr $i + 1`
done
