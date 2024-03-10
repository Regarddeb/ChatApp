<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Filesystem\Filesystem;

class MakeActionCommand extends Command
{
    protected $signature = 'make:action {name}';
    protected $description = 'Create a new action class';

    protected $files;

    public function __construct(Filesystem $files)
    {
        parent::__construct();

        $this->files = $files;
    }

    public function handle()
    {
        $name = $this->argument('name');
        $class = Str::studly($name);

        $this->createAction($class);
        $this->info('Action class created successfully!');
    }

    protected function createAction($class)
    {
        $nameParts = explode('/', $class);
        $className = array_pop($nameParts);
        $namespacePath = implode('/', $nameParts);
        $namespace = $this->laravel->getNamespace() . 'Http\\Actions\\' . $namespacePath;

        $path = app_path("Http/Actions/{$namespacePath}/{$className}.php");

        $this->makeDirectory($path);

        if ($this->alreadyExists($class)) {
            $this->error('Action class already exists!');
            return false;
        }

        $this->files->put($path, $this->buildClass($namespace, $className));

        $this->info("Action class created: $class");
    }

    protected function buildClass($namespace, $class)
    {
        return str_replace(
            ['DummyNamespace', '{{ className }}'],
            [$namespace, $class],
            $this->files->get($this->getStub())
        );
    }

    protected function getStub()
    {
        return __DIR__ . '/stubs/action.stub';
    }

    protected function makeDirectory($path)
    {
        if (!$this->files->isDirectory(dirname($path))) {
            $this->files->makeDirectory(dirname($path), 0755, true, true);
        }
    }

    protected function alreadyExists($class)
    {
        return $this->files->exists(app_path("Http/Actions/{$class}.php"));
    }
}
