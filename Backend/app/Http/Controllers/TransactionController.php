<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionRequest;
use App\Http\Resources\TransactionResource;
use App\Services\TransactionService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    //

    private TransactionService $transactionService;

    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    public function index()
    {
        $fields = ['*'];
        $transactions = $this->transactionService->getAll($fields);
        return response()->json(TransactionResource::collection($transactions));

    }

    public function store(TransactionRequest $request)
    {
        $transaction = $this->transactionService->createTransaction($request->validated());

        return response()->json([
            'message' => 'Transaction recorded successfully',
            'data' => $transaction,
        ], 201);
    }

    public function show(int $id)
    {
        try {
            $fields = ['*'];
            $transaction = $this->transactionService->getTransactionById($id, $fields);
            return response()->json(new TransactionResource($transaction));
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'transaction not found',
            ], 404);
        }
    }

    public function getTransactionsByMerchant()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'No auth available'], 500);
        }

        if (!$user->merchant) {
            return response()->json(['message' => 'No merchant assigned'], 403); //forbidden
        }

        $merchantId = $user->merchant->id;

        $transactions = $this->transactionService->getTransactionsByMerchant($merchantId);

        return response()->json($transactions);
    }

}
