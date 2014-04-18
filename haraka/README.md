haraka -c .
=================
Swaks - Swiss Army Knife for SMTP
http://www.jetmore.org/john/code/swaks/

brew install swaks

Usage:
swaks -h example.com -f from@example.com -t jason@example.com -s localhost -p 2525 --attach README.md --attach package.json


http://www.jetmore.org/john/code/swaks/latest/doc/ref.txt

From Haraka README
=================

Haraka

Congratulations on creating a new installation of Haraka.

This directory contains two key directories for how Haraka will function:

 - config
           This directory contains configuration files for Haraka. The
           directory contains the default configuration. You probably want
           to modify some files in here, particularly `smtp.ini`.
 - plugins
           This directory contains custom plugins which you write to run in
           Haraka. The plugins which ship with Haraka are still available
           to use.
 - docs/plugins
           This directory contains documentation for your plugins.

Documentation for Haraka is available via `haraka -h <name> where the name
is either the name of a plugin (without the .js extension) or the name of
a core Haraka module, such as `Connection` or `Transaction`.

To get documentation on writing a plugin type `haraka -h Plugins`.
