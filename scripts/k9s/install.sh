K9S_VERSION='0.21.4'
  
echo '=> installing K9S for linux amd64'
wget --content-disposition "https://github.com/derailed/k9s/releases/download/v$K9S_VERSION/k9s_Linux_x86_64.tar.gz" -P scripts/k9s/tmp
tar -xvf scripts/k9s/tmp/k9s_Linux_x86_64.tar.gz -C scripts/k9s/tmp
sudo mv scripts/k9s/tmp/k9s /usr/local/bin/k9s
rm -rf scripts/k9s/tmp
mkdir -p $HOME/.k9s