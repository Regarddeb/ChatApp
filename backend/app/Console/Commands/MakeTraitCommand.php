<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Filesystem\Filesystem;

class MakeTraitCommand extends Command
{
    protected $signature = 'make:trait {name}';
    protected $description = 'Create a new trait';

    protected $files;

    public function __construct(Filesystem $files)
    {
        parent::__construct();

        $this->files = $files;
    }

    public function handle()
    {
        $name = $this->argument('name');
        $traitName = Str::studly($name);

        $this->createTrait($traitName);
        $this->info('Trait created successfully!');
    }

    protected function createTrait($traitName)
    {
        $path = app_path("Http/Traits/{$traitName}.php"); // Updated path

        $this->makeDirectory($path);

        if ($this->alreadyExists($traitName)) {
            $this->error('Trait already exists!');
            return false;
        }

        $this->files->put($path, $this->buildTrait($traitName));

        $this->info("Trait created: $traitName");
    }

    protected function buildTrait($traitName)
    {
        $namespace = $this->laravel->getNamespace() . 'Http\\Traits'; // Updated namespace

        return str_replace(
            ['{{namespace}}', '{{traitName}}'],
            [$namespace, $traitName],
            $this->files->get($this->getStub())
        );
    }

    protected function getStub()
    {
        return __DIR__ . '/stubs/trait.stub';
    }

    protected function makeDirectory($path)
    {
        if (!$this->files->isDirectory(dirname($path))) {
            $this->files->makeDirectory(dirname($path), 0755, true, true);
        }
    }

    protected function alreadyExists($traitName)
    {
        return $this->files->exists(app_path("Traits/{$traitName}.php"));
    }
}
