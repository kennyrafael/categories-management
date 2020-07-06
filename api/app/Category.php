<?php

namespace App;

use DateTime;

class Category
{
    public int $id;
    public ?int $category_id;
    public string $name;
    public string $created;
    public string $updated;

    public function __construct(string $name, ?int $category_id)
    {
        $this->id = (int) microtime(true);
        $this->name = $name;
        $this->category_id = $category_id;
        $this->created = (new DateTime())->format('Y-m-d H:i:s');
        $this->updated = (new DateTime())->format('Y-m-d H:i:s');
    }
}
