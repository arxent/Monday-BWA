<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //
    private $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        $fields = ['id', 'name', 'photo', 'tagline'];

        $categories = $this->categoryService->getAll($fields);

        return response()->json(CategoryResource::collection($categories));
    }

    public function show(int $id)
    {
        try {
            $fields = ['id', 'name', 'photo', 'tagline'];

            $category = $this->categoryService->getById($id, $fields);

            return response()->json(new CategoryResource($category));

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'category not found',
            ], 404);
        }
    }

    public function store(CategoryRequest $request)
    {
        $category = $this->categoryService->create($request->validated());

        return response()->json(new CategoryResource($category), 201);
    }

    public function update(CategoryRequest $request, int $id)
    {
        try {
            $category = $this->categoryService->update($id, $request->validated());

            return response()->json(new CategoryResource($category));

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'category not found',
            ], 404);
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->categoryService->delete($id);
            return response()->json([
                'message' => 'category deleted successfully'
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'category not found',
            ], 404);
        }
    }

}
