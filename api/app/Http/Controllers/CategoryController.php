<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Category;
use App\CategoryResource;
use Exception;

class CategoryController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $filter = $request->query('filter');       
            return $this->responseSuccess(CategoryResource::readCategoriesTree($filter), 'Categories retrieved with success!');
        } catch (Exception $e) {
            return $this->responseError($e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $input = $request->all();

            $validator = Validator::make($input, [
                'name' => 'required',
            ]);

            if ($validator->fails()) {
                return $this->responseError('Validation Error.', $validator->errors());
            }

            $name = $request->get('name', '');
            $category_id = $request->get('category_id', null);
            $new_category = new Category($name, $category_id);

            CategoryResource::newCategory($new_category);

            return $this->responseSuccess($new_category, 'Category successfully created.');
        } catch (Exception $e) {
            return $this->responseError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $category = CategoryResource::getCategoryTree($id);
            return $this->responseSuccess($category, 'Category retrieved with success!');
        } catch (Exception $e) {
            return $this->responseError($e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $input = $request->all();

            $validator = Validator::make($input, [
                'name' => 'required',
            ]);

            if ($validator->fails()) {
                return $this->responseError('Validation Error.', $validator->errors());
            }

            $updated_category = CategoryResource::getCategory($id);
            $updated_category->name = $request->get('name', '');
            $updated_category->category_id = $request->get('category_id', null);

            CategoryResource::updateCategory($id, $updated_category);

            return $this->responseSuccess($updated_category, 'Category updated with success!');
        } catch (Exception $e) {
            return $this->responseError($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            CategoryResource::deleteCategory($id);
            return $this->responseSuccess('', 'Category deleted with success!');
        } catch (Exception $e) {
            return $this->responseError($e->getMessage());
        }
    }
}
