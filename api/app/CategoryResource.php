<?php

namespace App;

use DateTime;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Support\Facades\Storage;

class CategoryResource
{
    public static function readCategories()
    {
        try {
            $contents = Storage::get('categories.json');
        } catch (FileNotFoundException $e) {
            Storage::put('categories.json', '[]');
            $contents = Storage::get('categories.json');
        }

        return json_decode($contents);
    }

    public static function buildTree(array $elements, $parentId = null)
    {
        $branch = array();

        foreach ($elements as $element) {
            if ($element->category_id == $parentId) {
                $children = CategoryResource::buildTree($elements, $element->id);
                if ($children) {
                    $element->subcategories = $children;
                }

                $branch[] = $element;
            }
        }

        return $branch;
    }

    public static function readCategoriesTree(?string $filter)
    {
        $include = [];
        $categories = array_filter(
            CategoryResource::readCategories(),
            function ($e) use (&$filter, &$include) {
                if (preg_match("/{$filter}/i", $e->name) || in_array($e->category_id, $include)) {
                    $include[] = $e->id;
                    return true;
                }

                return false;
            }
        );
        return CategoryResource::buildTree($categories);
    }



    public static function newCategory($category)
    {
        $current_categories = CategoryResource::readCategories();
        $current_categories[] = $category;
        Storage::put('categories.json', json_encode($current_categories));
    }

    public static function updateCategory($id, $category)
    {
        $current_categories = CategoryResource::readCategories();
        $current_categories = array_map(function ($current_category) use (&$id, &$category) {
            if ($current_category->id == $id) {
                $category->updated = (new DateTime())->format('Y-m-d H:i:s');
                return $category;
            }
            return $current_category;
        }, $current_categories);

        Storage::put('categories.json', json_encode($current_categories));
    }

    public static function getCategory($id)
    {
        $current_categories = CategoryResource::readCategories();
        return current(array_filter(
            $current_categories,
            function ($e) use (&$id) {
                return $e->id == $id;
            }
        ));
    }

    public static function getCategoryTree($id)
    {
        $current_categories = CategoryResource::readCategories();
        $category = CategoryResource::getCategory($id);
        $category->subcategories = CategoryResource::buildTree($current_categories, $id);
        return $category;
    }

    public static function deleteCategory($id)
    {
        $current_categories = CategoryResource::readCategories();
        $current_categories = array_filter(
            $current_categories,
            function ($e) use (&$id) {
                return $e->id != $id;
            }
        );
        Storage::put('categories.json', json_encode(array_values($current_categories)));
    }
}
