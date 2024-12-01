import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function CategorySubmit({ closeCategorySubmit }: { closeCategorySubmit: () => void }) {
    const [categoryName, setCategoryName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            setSubmitStatus('success')
            setCategoryName('')
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
            closeCategorySubmit()
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Submit New Category</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="categoryName">Category Name</Label>
                        <Input
                            id="categoryName"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Enter category name"
                            required
                        />
                    </div>

                    {submitStatus === 'success' && (
                        <div className="flex items-center text-green-600">
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            <span>Category submitted successfully!</span>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="flex items-center text-red-600">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            <span>An error occurred. Please try again.</span>
                        </div>
                    )}
                </CardContent>

                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Category'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}