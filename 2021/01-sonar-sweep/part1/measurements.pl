use v5.26;
use warnings;

use Data::Dumper::Concise;
use Data::Printer;
use Syntax::Keyword::Try;

open my $fh, '<', 'input.txt';

my $prev = 'inf';
my $increase = 0;
while(my $line = <$fh>) {
    my $cur = int $line;
    $increase += 1 if $cur > $prev;
    $prev = $cur;
}

print "Result: $increase\n";

